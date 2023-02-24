import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { CreatePrivateChatDto } from './dto/create-private.dto';
import { BasicResponse } from '../response/basic-response';
import { CreatePublicChatDto } from './dto/create-public.dto';
import { Chat } from '../generated/prisma-class/chat';
import { Message } from '../generated/prisma-class/message';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-private')
  async createPrivateChat(@Body() dto: CreatePrivateChatDto) {
    try {
      const createdChat = await this.chatService.createPrivateChat(dto);
      return BasicResponse.getSuccess(createdChat, 'Чат успешно создан!');
    } catch (error: unknown) {
      return BasicResponse.getError('При создании чата произошла ошибка!');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-public')
  async createPublicChat(@Body() dto: CreatePublicChatDto) {
    try {
      const createdChat = await this.chatService.createPublicChat(dto);
      return BasicResponse.getSuccess(createdChat, 'Чат успешно создан!');
    } catch (err) {
      return BasicResponse.getError('При создании чата произошла ошибка!');
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BasicResponse<Chat[]>,
  })
  @UseGuards(JwtAuthGuard)
  @Get('list-by-user/:userId')
  async getChatsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<BasicResponse<Chat[]>> {
    try {
      const posts = await this.chatService.getChatsByUserId(userId);
      return BasicResponse.getSuccess(posts, 'Чаты успешно получены!');
    } catch (error) {
      return BasicResponse.getError(
        'При получении списка чатов произошла ошибка!',
      );
    }
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: BasicResponse<Message[]>,
  })
  @UseGuards(JwtAuthGuard)
  @Get('list-by-chat/:chatId')
  async getMessagesByChatId(@Param('chatId') chatId: string) {
    try {
      const posts = await this.chatService.getMessagesByChatId(chatId);
      return BasicResponse.getSuccess(posts, 'Сообщения успешно получены!');
    } catch (error) {
      return BasicResponse.getError(
        'При получении списка Сообщений произошла ошибка!',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:chatId')
  async deleteChatById(@Param('chatId') chatId: string) {
    try {
      const posts = await this.chatService.deleteChatById(chatId);
      return BasicResponse.getSuccess(posts, 'Чаты успешно удален!');
    } catch (error) {
      console.log(error);
      return BasicResponse.getError('При удалении чата произошла ошибка!');
    }
  }
}
