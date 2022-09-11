import { NotFoundException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`Пост с ид - ${postId} не найден`);
  }
}
