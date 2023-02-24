import { Module } from '@nestjs/common';
import { ChatGetaway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    ChatGetaway,
    ChatService,
    PrismaService,
    JwtService,
    ConfigService,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
