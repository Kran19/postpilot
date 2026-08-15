import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { TenantGuard } from '../src/workspaces/tenant.guard';

describe('P0 Security Audit: TenantGuard Isolation Test', () => {
  let guard: TenantGuard;

  beforeEach(() => {
    guard = new TenantGuard();
  });

  it('should ALLOW access when user workspaceId matches parameter workspaceId', () => {
    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { userId: 'user-1', workspaceId: 'ws-acme', role: 'owner' },
          params: { wsId: 'ws-acme' },
        }),
      }),
    };

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should DENY access (throw ForbiddenException) when user from Workspace A attempts access to Workspace B', () => {
    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { userId: 'user-attacker', workspaceId: 'ws-workspace-a', role: 'owner' },
          params: { wsId: 'ws-workspace-b' },
        }),
      }),
    };

    expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
  });

  it('should DENY access when request user context is missing', () => {
    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => ({
          params: { wsId: 'ws-target' },
        }),
      }),
    };

    expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
  });
});
