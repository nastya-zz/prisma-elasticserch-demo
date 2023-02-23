import { NotAcceptableException } from '@nestjs/common';

export class ChatNotAcceptableException extends NotAcceptableException {
  constructor() {
    super(`При создании чата произошла ошибка`);
  }
}
