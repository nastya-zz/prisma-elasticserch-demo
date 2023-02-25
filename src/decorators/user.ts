import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getJWTConfig } from '../configs/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const UserInfo = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const UserSocketInfo = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const jwtService: JwtService = new JwtService();
    const configService: ConfigService = new ConfigService();

    const socket = ctx.switchToWs().getClient();
    const token = socket.handshake.headers['authorization'];

    if (!token) {
      return null;
    }

    const secret = await getJWTConfig(configService);

    return jwtService.verify(token.split(' ')[1], secret);
  },
);
