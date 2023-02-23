import { Post } from './post';
import { Chat } from './chat';
import { Address } from './address';
import { Message } from './message';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => Post })
  posts: Post[];

  @ApiProperty({ isArray: true, type: () => Chat })
  chats: Chat[];

  @ApiPropertyOptional({ type: () => Address })
  address?: Address;

  @ApiProperty({ isArray: true, type: () => Message })
  Message: Message[];
}
