import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  private readonly logger = new Logger(SocketAuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // regular `Socket` from socket.io is probably sufficient
    const socket = context.switchToWs().getClient();

    // for testing support, fallback to token header
    const token = socket.handshake.headers['authorization'];
    // this.logger.log('token', token);

    if (!token) {
      this.logger.error('No authorization token provided');

      throw new WsUnauthorizedException('No token provided');
    }

    try {
      const secret = await getJWTConfig(this.configService);
      const payload = this.jwtService.verify(token.split(' ')[1], secret);
      // this.logger.log('payload', payload);

      // this.logger.debug(`Validating admin using token payload`, payload);
      //
      // const { sub, pollID } = payload;
      //
      // const poll = await this.pollsService.getPoll(pollID);
      //
      // if (sub !== poll.adminID) {
      //   throw new WsUnauthorizedException('Admin privileges required');
      // }
      //
      return true;
    } catch (err) {
      throw new WsUnauthorizedException('Admin privileges required');
    }
  }
}

type WsExceptionType = 'BadRequest' | 'Unauthorized' | 'Unknown';

export class WsTypeException extends WsException {
  readonly type: WsExceptionType;

  constructor(type: WsExceptionType, message: string | unknown) {
    const error = {
      type,
      message,
    };
    super(error);
    this.type = type;
  }
}

export class WsBadRequestException extends WsTypeException {
  constructor(message: string | unknown) {
    super('BadRequest', message);
  }
}

export class WsUnauthorizedException extends WsTypeException {
  constructor(message: string | unknown) {
    super('Unauthorized', message);
  }
}

export class WsUnknownException extends WsTypeException {
  constructor(message: string | unknown) {
    super('Unknown', message);
  }
}
