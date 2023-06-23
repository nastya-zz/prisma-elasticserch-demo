import { User } from './user';
import { Chat } from './chat';
import { Advertisement } from './advertisement';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageRelations {
  @ApiProperty({ type: () => User })
  author: User;

  @ApiPropertyOptional({ type: () => Chat })
  Chat?: Chat;

  @ApiProperty({ isArray: true, type: () => Advertisement })
  Advertisement: Advertisement[];
}
