import { NotFoundException } from '@nestjs/common';

export class UserByIdNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`Пользователь с ид - ${userId} не найден`);
  }
}
