import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserWorkspaces(userId: string) {
    const memberships = await this.prisma.workspaceMember.findMany({
      where: { userId },
      include: {
        workspace: {
          include: {
            _count: {
              select: {
                members: true,
                connectedAssets: true,
                automations: true,
              },
            },
          },
        },
      },
    });

    return memberships.map((m) => ({
      id: m.workspace.id,
      name: m.workspace.name,
      slug: m.workspace.slug,
      plan: m.workspace.planTier,
      role: m.role,
      memberCount: m.workspace._count.members,
      assetsCount: m.workspace._count.connectedAssets,
      automationsCount: m.workspace._count.automations,
      createdAt: m.workspace.createdAt.toISOString(),
    }));
  }

  async getWorkspaceById(workspaceId: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            connectedAssets: true,
            automations: true,
            conversations: true,
          },
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace ${workspaceId} not found`);
    }

    return {
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
      plan: workspace.planTier,
      memberCount: workspace.members.length,
      assetsCount: workspace._count.connectedAssets,
      automationsCount: workspace._count.automations,
      createdAt: workspace.createdAt.toISOString(),
      members: workspace.members.map((m) => ({
        id: m.id,
        userId: m.user.id,
        name: m.user.fullName,
        email: m.user.email,
        role: m.role,
        status: m.status,
      })),
    };
  }
}
