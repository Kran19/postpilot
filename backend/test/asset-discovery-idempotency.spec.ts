interface PageDiscoveryPayload {
  id: string;
  name: string;
  access_token: string;
  instagram_business_account?: {
    id: string;
  };
}

class MetaAssetManager {
  private connections = new Map<string, any>();
  private assets = new Map<string, any>();

  upsertConnectionAndAssets(workspaceId: string, providerAccountId: string, pages: PageDiscoveryPayload[]) {
    const connKey = `${workspaceId}_${providerAccountId}`;
    if (!this.connections.has(connKey)) {
      this.connections.set(connKey, {
        id: `conn_${Date.now()}`,
        workspaceId,
        providerAccountId,
        status: 'active',
        createdAt: new Date(),
      });
    }

    const connection = this.connections.get(connKey);
    const discoveredAssets: any[] = [];

    for (const page of pages) {
      // 1. Facebook Page Asset
      const pageKey = `${workspaceId}_fb_${page.id}`;
      if (!this.assets.has(pageKey)) {
        this.assets.set(pageKey, {
          id: `asset_fb_${page.id}`,
          workspaceId,
          metaConnectionId: connection.id,
          platform: 'FACEBOOK',
          externalId: page.id,
          name: page.name,
        });
      }
      discoveredAssets.push(this.assets.get(pageKey));

      // 2. Linked Instagram Professional Account Asset
      if (page.instagram_business_account?.id) {
        const igId = page.instagram_business_account.id;
        const igKey = `${workspaceId}_ig_${igId}`;
        if (!this.assets.has(igKey)) {
          this.assets.set(igKey, {
            id: `asset_ig_${igId}`,
            workspaceId,
            metaConnectionId: connection.id,
            platform: 'INSTAGRAM',
            externalId: igId,
            name: `${page.name} (Instagram)`,
          });
        }
        discoveredAssets.push(this.assets.get(igKey));
      }
    }

    return { connection, assets: discoveredAssets };
  }

  getWorkspaceAssets(workspaceId: string) {
    const results: any[] = [];
    for (const asset of this.assets.values()) {
      if (asset.workspaceId === workspaceId) {
        results.push(asset);
      }
    }
    return results;
  }
}

function runAssetDiscoveryAudit() {
  console.log('====================================================');
  console.log(' ASSET DISCOVERY & IDEMPOTENCY SECURITY SUITE');
  console.log('====================================================');

  const manager = new MetaAssetManager();
  let passedCount = 0;
  const workspaceA = 'ws-brand-acme';
  const workspaceB = 'ws-brand-competitor';

  const mockMetaPages: PageDiscoveryPayload[] = [
    {
      id: 'page_10928301',
      name: 'Acme Official Store',
      access_token: 'mock_page_token_abc123',
      instagram_business_account: { id: 'ig_178414092810' },
    },
  ];

  // Test 1: Real Asset Discovery & Dual Platform Persistence (Page + IG)
  const res1 = manager.upsertConnectionAndAssets(workspaceA, 'fb_user_881920', mockMetaPages);
  if (res1.assets.length === 2 && res1.assets[0].platform === 'FACEBOOK' && res1.assets[1].platform === 'INSTAGRAM') {
    console.log('✓ TEST 1 [Facebook Page & Linked Instagram Discovery]: PASSED 🟢 (2 Provider Assets Created)');
    passedCount++;
  } else {
    console.error('✗ TEST 1 FAILED!');
  }

  // Test 2: Idempotent Duplicate Discovery (Second Sync does not duplicate records)
  const res2 = manager.upsertConnectionAndAssets(workspaceA, 'fb_user_881920', mockMetaPages);
  const allAssetsWsA = manager.getWorkspaceAssets(workspaceA);
  if (allAssetsWsA.length === 2 && res2.connection.id === res1.connection.id) {
    console.log('✓ TEST 2 [Asset Discovery Idempotency]: PASSED 🟢 (Zero Duplicate DB Records Created)');
    passedCount++;
  } else {
    console.error('✗ TEST 2 FAILED: Duplicate assets created!');
  }

  // Test 3: Multi-Tenant Asset Isolation (Workspace B cannot see Workspace A assets)
  const allAssetsWsB = manager.getWorkspaceAssets(workspaceB);
  if (allAssetsWsB.length === 0) {
    console.log('✓ TEST 3 [Multi-Tenant Asset Isolation]: PASSED 🟢 (Workspace B Sees 0 Workspace A Assets)');
    passedCount++;
  } else {
    console.error('✗ TEST 3 FAILED: Cross-tenant asset leak!');
  }

  console.log('====================================================');
  console.log(` DISCOVERY SUMMARY: ${passedCount}/3 AUDITS PASSED 🟢`);
  console.log('====================================================');
}

runAssetDiscoveryAudit();
