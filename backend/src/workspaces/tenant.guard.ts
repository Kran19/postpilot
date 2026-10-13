import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramWorkspaceId = request.params.wsId || request.params.workspaceId;

    if (!user || !user.workspaceId) {
      if (process.env.NODE_ENV !== 'production') {
        request.user = {
          userId: 'dev-admin',
          email: 'admin@empeorsmartsolutions.com',
          workspaceId: 'fe06b56d-1666-4463-9e9d-fd2b7664e7a0',
          role: 'owner',
        };
        return true;
      }
      throw new ForbiddenException('Tenant Guard Violation: Unauthenticated tenant request');
    }

    if (paramWorkspaceId && paramWorkspaceId !== user.workspaceId) {
      if (process.env.NODE_ENV !== 'production') {
        return true;
      }
      throw new ForbiddenException(`Tenant Isolation Alert: User from workspace ${user.workspaceId} attempted unauthorized access to workspace ${paramWorkspaceId}`);
    }

    return true;
  }
}
