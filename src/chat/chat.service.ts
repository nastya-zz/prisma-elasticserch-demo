import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePrivateChatDto } from './dto/create-private.dto';
import { CreatePublicChatDto } from './dto/create-public.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPrivateChat(chat: CreatePrivateChatDto) {
    try {
      const chatForSave = {
        name: '',
        authorId: chat.authorId,
        guests: [chat.authorId, chat.guestId],
      };

      return await this.prismaService.chat.create({
        data: chatForSave,
      });
    } catch (err) {
      console.log(err);
      //todo throw error
    }
  }

  async getChatsByUserId(userId) {
    return this.prismaService.chat.findMany({
      where: {
        guests: {
          hasSome: [userId],
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async createPublicChat(chat: CreatePublicChatDto) {
    console.log(chat);

    try {
      const chatForSave = {
        ...chat,
        guests: [chat.authorId],
      };

      return await this.prismaService.chat.create({
        data: chatForSave,
      });
    } catch (err) {
      console.log(err);
      //todo throw error
    }
  }
}
