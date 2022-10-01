import { NotFoundException } from '@nestjs/common';

export class UserByEmailNotFoundException extends NotFoundException {
  constructor(userEmail: string) {
    super(`Пользователь с email - ${userEmail} не найден`);
  }
}
