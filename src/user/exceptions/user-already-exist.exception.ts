import { NotFoundException } from '@nestjs/common';

export class UserAlreadyExistException extends NotFoundException {
  constructor(email: string) {
    super(`Пользователь с  email - ${email} уже существует!`);
  }
}
