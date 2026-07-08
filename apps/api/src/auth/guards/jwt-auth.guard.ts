import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../database/prisma.service";
import { AuthenticatedUser, JwtPayload } from "../types/authenticated-user";

type RequestWithAuth = {
  headers: {
    authorization?: string;
  };
  user?: AuthenticatedUser;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithAuth>();
    const token = this.getBearerToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException("Bearer token is required.");
    }

    const jwtSecret = this.getJwtSecret();
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: jwtSecret
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    });

    if (!user) {
      throw new UnauthorizedException("Authenticated user no longer exists.");
    }

    request.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    return true;
  }

  private getBearerToken(authorizationHeader?: string) {
    if (!authorizationHeader) {
      return null;
    }

    const [type, token] = authorizationHeader.split(" ");
    return type === "Bearer" && token ? token : null;
  }

  private getJwtSecret() {
    const jwtSecret = this.configService.get<string>("JWT_SECRET");

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is required to verify access tokens.");
    }

    return jwtSecret;
  }
}
