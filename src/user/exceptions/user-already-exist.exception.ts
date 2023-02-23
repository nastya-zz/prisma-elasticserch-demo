import { NotAcceptableException } from '@nestjs/common/exceptions/not-acceptable.exception';

export class UserAlreadyExistException extends NotAcceptableException {
  constructor(email: string) {
    super(`Пользователь с  email - ${email} уже существует!`);
  }
}
