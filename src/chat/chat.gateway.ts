import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ReadMessageDto } from './dto/read-message-dto';
import { Logger, UseGuards } from '@nestjs/common';
import { SocketAuthGuard } from '../guards/socket.guard';
import { UserSocketInfo } from '../decorators/user';
import { User } from '../generated/prisma-class/user';
import { Message } from '../generated/prisma-class/message';

@WebSocketGateway({ cors: { origin: true } })
export class ChatGetaway {
  private readonly logger = new Logger(ChatGetaway.name);

  constructor(private readonly prismaService: PrismaService) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() dto: CreateMessageDto): Promise<void> {
    this.logger.log('message', dto);
    try {
      const savedMessage = await this.prismaService.message.create({
        data: dto,
      });
      const chat = await this.prismaService.chat.update({
        where: { id: dto.chatId },
        data: {
          updatedAt: new Date(),
        },
      });

      this.server.emit('message', savedMessage);
      this.server.emit('updateChat', chat);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('readMessage')
  async handleReadMessage(@MessageBody() dto: ReadMessageDto): Promise<void> {
    this.logger.log('readMessage', dto);

    try {
      const message = await this.prismaService.message.update({
        where: {
          id: dto.messageId,
        },
        data: {
          readUserIds: {
            push: dto.userId,
          },
        },
      });

      this.server.emit('readMessage', message);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @MessageBody() dto: Message,
    @UserSocketInfo() user: User | null,
  ): Promise<void> {
    this.logger.log('deleteMessage', dto);
    this.logger.log('deleteMessage user', user);

    try {
      if (!user) {
        throw new Error('Пользователь не найден');
      }
      const chat = await this.prismaService.chat.findUnique({
        where: {
          id: dto.chatId,
        },
      });
      const canDelete = chat.public
        ? user.id === dto.authorId || user.id === chat.buyerId
        : user.id === dto.authorId;

      if (canDelete) {
        const deletedMessage = await this.prismaService.message.delete({
          where: {
            id: dto.id,
          },
        });

        this.logger.log('deletedMessage', deletedMessage);
        this.server.emit('deletedMessage', deletedMessage);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  afterInit() {
    this.logger.log('socket start', this.server.path());
    //Выполняем действия
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected: ${client.id}`);
    //Выполняем действия
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Connected ${client.id}`);
    //Выполняем действия
  }
}
