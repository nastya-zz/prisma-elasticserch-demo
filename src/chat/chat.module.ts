import { Module } from '@nestjs/common';
import { ChatGetaway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ChatGetaway, ChatService, PrismaService],
  controllers: [ChatController],
})
export class ChatModule {}
