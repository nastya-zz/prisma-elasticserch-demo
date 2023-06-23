import { Post } from './post';
import { Advertisement } from './advertisement';
import { Chat } from './chat';
import { Message } from './message';
import { ApiProperty } from '@nestjs/swagger';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => Post })
  posts: Post[];

  @ApiProperty({ isArray: true, type: () => Advertisement })
  advertisements: Advertisement[];

  @ApiProperty({ isArray: true, type: () => Chat })
  chats: Chat[];

  @ApiProperty({ isArray: true, type: () => Message })
  Message: Message[];
}
