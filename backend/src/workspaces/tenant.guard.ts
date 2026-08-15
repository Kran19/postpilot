import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramWorkspaceId = request.params.wsId || request.params.workspaceId;

    if (!user || !user.workspaceId) {
      throw new ForbiddenException('Tenant Guard Violation: Unauthenticated tenant request');
    }

    if (paramWorkspaceId && paramWorkspaceId !== user.workspaceId) {
      throw new ForbiddenException(`Tenant Isolation Alert: User from workspace ${user.workspaceId} attempted unauthorized access to workspace ${paramWorkspaceId}`);
    }

    return true;
  }
}
