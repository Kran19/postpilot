import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await argon2.hash(dto.password);

    // Create user and default workspace
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        fullName: dto.fullName,
      },
    });

    const slug = `${dto.workspaceName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const workspace = await this.prisma.workspace.create({
      data: {
        name: dto.workspaceName,
        slug,
        members: {
          create: {
            userId: user.id,
            role: 'owner',
          },
        },
      },
    });

    const tokens = this.generateTokens(user.id, user.email, workspace.id, 'owner');
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      workspace: {
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
        role: 'owner',
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: {
        memberships: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const validPassword = await argon2.verify(user.passwordHash, dto.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const primaryMembership = user.memberships[0];
    const workspace = primaryMembership ? primaryMembership.workspace : null;
    const role = primaryMembership ? primaryMembership.role : 'agent';

    const tokens = this.generateTokens(user.id, user.email, workspace ? workspace.id : '', role);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      workspace: workspace
        ? {
            id: workspace.id,
            name: workspace.name,
            slug: workspace.slug,
            role,
          }
        : null,
      ...tokens,
    };
  }

  private generateTokens(userId: string, email: string, workspaceId: string, role: string) {
    const payload = { sub: userId, email, workspaceId, role };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
