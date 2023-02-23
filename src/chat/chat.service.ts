import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePrivateChatDto } from './dto/create-private.dto';
import { CreatePublicChatDto } from './dto/create-public.dto';
import { PrivateChatNotFoundException } from './exceptions/private-chat-not-found.exception';
import { ChatNotAcceptableException } from './exceptions/chat-create.exception';

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
      throw new ChatNotAcceptableException();
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

    if (!chats.length) {
      return [];
    }

    return Promise.all(
      chats.map(async (chat) => {
        if (!chat.public) {
          const guestId =
            chat.guestIds.filter((id) => id !== userId)?.[0] || null;

          if (!guestId) {
            throw new PrivateChatNotFoundException(chat.id);
          }
          const guest = await this.prismaService.user.findUnique({
            where: {
              id: guestId,
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

  async getMessagesByChatId(chatId: string) {
    const messages = await this.prismaService.message.findMany({
      where: {
        chatId,
      },
    });

    if (!messages) return [];

    return messages;
  }

  async createPublicChat(chat: CreatePublicChatDto) {
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
      throw new ChatNotAcceptableException();
    }
  }

  async deleteChatById(chatId: string) {
    const deleteMessages = this.prismaService.message.deleteMany({
      where: {
        chatId: chatId,
      },
    });

    const deleteChat = this.prismaService.chat.delete({
      where: {
        id: chatId,
      },
    });

    return this.prismaService.$transaction([deleteMessages, deleteChat]);
  }
}
