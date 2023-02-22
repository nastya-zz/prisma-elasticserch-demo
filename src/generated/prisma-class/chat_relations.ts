import { User } from './user';
import { Message } from './message';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRelations {
  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty({ isArray: true, type: () => Message })
  Message: Message[];
}
