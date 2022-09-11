import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`Пользователь с ид - ${userId} не найден`);
  }
}
