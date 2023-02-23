import { NotFoundException } from '@nestjs/common';

export class PrivateChatNotFoundException extends NotFoundException {
  constructor(chatId: string) {
    super(`Чат с ид - ${chatId} не найден`);
  }
}
