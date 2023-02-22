import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway()
export class ChatGetaway {
  constructor(private readonly prismaService: PrismaService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() dto: CreateMessageDto): Promise<void> {
    console.log('message', dto);
    try {
      await this.prismaService.message.create({
        data: dto,
      });
      this.server.emit('message', dto);
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
