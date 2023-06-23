import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePrivateChatDto } from './dto/create-private.dto';
import { ChatNotAcceptableException } from './exceptions/chat-create.exception';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPrivateChat(chat: CreatePrivateChatDto) {
    try {
      const authorAdvertisement = await this.getUserByAdvertisementId(
        chat.advertisementId,
      );
      const chatForSave = {
        sellerId: authorAdvertisement.id,
        buyerId: chat.buyerId,
        advertisementId: chat.advertisementId,
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
    let chats = await this.prismaService.chat.findMany({
      where: {
        OR: [
          {
            buyerId: userId,
          },
          {
            sellerId: userId,
          },
        ],
      },
      orderBy: { updatedAt: 'desc' },
    });

    if (!chats.length) {
      return [];
    }

    chats = await Promise.all(
      chats.map(async (chat) => {
        const searchId = userId === chat.buyerId ? chat.sellerId : chat.buyerId;
        const chatName = await this.prismaService.user.findUnique({
          where: {
            id: searchId,
          },
          select: {
            name: true,
          },
        });

        return {
          ...chat,
          ...chatName,
        };
      }),
    );

    return chats;
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

  // async createPublicChat(chat: CreatePublicChatDto) {
  //   try {
  //     const chatForSave = {
  //       ...chat,
  //       guestIds: [chat.authorId],
  //     };
  //
  //     return await this.prismaService.chat.create({
  //       data: chatForSave,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     throw new ChatNotAcceptableException();
  //   }
  // }

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

  async getUserByAdvertisementId(advertisementId: number) {
    try {
      const advertisement = await this.prismaService.advertisement.findUnique({
        where: {
          id: advertisementId,
        },
      });

      return await this.prismaService.user.findUnique({
        where: {
          id: advertisement.userId,
        },
      });
    } catch (err: unknown) {
      //todo catch error
    }
  }
}
