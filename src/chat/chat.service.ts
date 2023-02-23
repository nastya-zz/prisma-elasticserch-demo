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
        guestIds: [chat.authorId, chat.guestId],
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
    const chats = await this.prismaService.chat.findMany({
      where: {
        guestIds: {
          hasSome: [userId],
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return Promise.all(
      chats.map(async (chat) => {
        if (!chat.public) {
          const guest = await this.prismaService.user.findUnique({
            where: {
              id: chat.guestIds.filter((id) => id !== userId)[0],
            },
          });

          chat.name = guest.name;
          return chat;
        } else {
          return chat;
        }
      }),
    );
  }

  async createPublicChat(chat: CreatePublicChatDto) {
    console.log(chat);

    try {
      const chatForSave = {
        ...chat,
        guestIds: [chat.authorId],
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
