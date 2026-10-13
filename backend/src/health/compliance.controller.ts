import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class ComplianceController {
  @Get('privacy')
  @Header('Content-Type', 'text/html; charset=utf-8')
  getPrivacyPolicy(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Privacy Policy — Empeor Smart Solutions / PostPilot</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 40px 20px; line-height: 1.6; }
    .card { max-width: 780px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    h1 { margin-top: 0; color: #0f172a; font-size: 28px; }
    h2 { color: #1e293b; font-size: 18px; margin-top: 28px; }
    .badge { display: inline-block; background: #dcfce7; color: #15803d; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 999px; margin-bottom: 12px; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #4338ca; }
    footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Meta App Review Compliance</div>
    <h1>Privacy Policy</h1>
    <p><em>Effective Date: January 1, 2026 • Empeor Smart Solutions (PostPilot SaaS)</em></p>
    
    <h2>1. Data Ingestion & Meta API Scopes</h2>
    <p>Empeor Smart Solutions accesses user data strictly via Meta Graph API upon explicit OAuth authorization. We request only essential permissions: <code>instagram_business_basic</code>, <code>instagram_business_manage_messages</code>, and <code>instagram_business_manage_comments</code>.</p>

    <h2>2. Data Encryption & Security</h2>
    <p>All Meta access tokens and customer message data are encrypted at rest with industry-standard AES-256-GCM. Tokens are never exposed to browser clients and are handled solely in isolated backend environments.</p>

    <h2>3. Data Retention & User Deletion</h2>
    <p>Users may request immediate deletion of their account data, message logs, and Meta tokens at any time via our <a href="/data-deletion">Data Deletion Instructions</a>.</p>

    <footer>
      &copy; 2026 Empeor Smart Solutions. All rights reserved.
    </footer>
  </div>
</body>
</html>`;
  }

  @Get('terms')
  @Header('Content-Type', 'text/html; charset=utf-8')
  getTerms(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Terms of Service — Empeor Smart Solutions / PostPilot</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 40px 20px; line-height: 1.6; }
    .card { max-width: 780px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    h1 { margin-top: 0; color: #0f172a; font-size: 28px; }
    h2 { color: #1e293b; font-size: 18px; margin-top: 28px; }
    footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Terms of Service</h1>
    <p><em>Effective Date: January 1, 2026 • Empeor Smart Solutions (PostPilot SaaS)</em></p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By connecting an Instagram Business or Facebook account to PostPilot, you agree to comply with these Terms of Service and Meta's Platform Terms.</p>

    <h2>2. Permitted Use</h2>
    <p>PostPilot provides social communication management, unified messaging inboxes, and workflow automation. Users must not use PostPilot for unsolicited spam or prohibited marketing activities under Meta Platform Policies.</p>

    <h2>3. Termination</h2>
    <p>You may disconnect your Meta channels or terminate your account at any time from the Channels settings.</p>

    <footer>
      &copy; 2026 Empeor Smart Solutions. All rights reserved.
    </footer>
  </div>
</body>
</html>`;
  }

  @Get('data-deletion')
  @Header('Content-Type', 'text/html; charset=utf-8')
  getDataDeletion(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Data Deletion Instructions — Empeor Smart Solutions / PostPilot</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 40px 20px; line-height: 1.6; }
    .card { max-width: 780px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    h1 { margin-top: 0; color: #0f172a; font-size: 28px; }
    h2 { color: #1e293b; font-size: 18px; margin-top: 28px; }
    ol { padding-left: 20px; }
    li { margin-bottom: 8px; }
    footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <h1>User Data Deletion Instructions</h1>
    <p><em>PostPilot (Empeor Smart Solutions) — Meta Platform Compliance</em></p>
    
    <p>PostPilot respects your privacy and gives you full control over your data. To delete your user data and remove all stored Instagram/Facebook credentials:</p>

    <h2>Method 1: Disconnect via Instagram Settings</h2>
    <ol>
      <li>Go to your Instagram account <strong>Settings and Privacy</strong> &gt; <strong>Apps and Websites</strong>.</li>
      <li>Find <strong>Post Pilot - IG</strong> (or Empeor Smart Solutions) under Active apps.</li>
      <li>Click <strong>Remove</strong>. This immediately revokes PostPilot's access.</li>
    </ol>

    <h2>Method 2: Immediate Data Purge Request</h2>
    <p>To purge all historical conversation logs and account identifiers from PostPilot's database:</p>
    <ol>
      <li>Email support at <code>privacy@empeorsmartsolutions.com</code> with the subject <em>"Data Deletion Request"</em> and your Instagram handle.</li>
      <li>Our automated compliance engine will delete all associated tokens, messages, and contact records within 24 hours.</li>
    </ol>

    <footer>
      &copy; 2026 Empeor Smart Solutions. All rights reserved.
    </footer>
  </div>
</body>
</html>`;
  }
}
