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
import { UseGuards } from '@nestjs/common';
import { SocketAuthGuard } from '../guards/socket.guard';

@WebSocketGateway({ cors: { origin: true } })
export class ChatGetaway {
  constructor(private readonly prismaService: PrismaService) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() dto: CreateMessageDto): Promise<void> {
    console.log('message', dto);
    try {
      await this.prismaService.message.create({
        data: dto,
      });
      const chat = await this.prismaService.chat.update({
        where: { id: dto.chatId },
        data: {
          updatedAt: new Date(),
        },
      });

      this.server.emit('message', dto);
      this.server.emit('updateChat', chat);
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('readMessage')
  async handleReadMessage(@MessageBody() dto: ReadMessageDto): Promise<void> {
    console.log('readMessage', dto);

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
      console.log(err);
    }
  }

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(@MessageBody() id: string): Promise<void> {
    console.log('deleteMessage', id);

    try {
      await this.prismaService.message.delete({
        where: {
          id,
        },
      });

      this.server.emit('deleteMessage', id);
    } catch (err) {
      console.log(err);
    }
  }

  afterInit() {
    console.log('socket start');
    //Выполняем действия
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Выполняем действия
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Выполняем действия
  }
}
