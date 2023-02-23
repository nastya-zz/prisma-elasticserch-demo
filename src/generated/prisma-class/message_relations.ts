import { User } from './user';
import { Chat } from './chat';
import { ApiProperty } from '@nestjs/swagger';

export class MessageRelations {
  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty({ type: () => Chat })
  chat: Chat;
}
