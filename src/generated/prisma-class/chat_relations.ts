import { User } from './user';
import { Message } from './message';
import { Advertisement } from './advertisement';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRelations {
  @ApiProperty({ type: () => User })
  buyer: User;

  @ApiProperty({ isArray: true, type: () => Message })
  Message: Message[];

  @ApiProperty({ type: () => Advertisement })
  Advertisement: Advertisement;
}
