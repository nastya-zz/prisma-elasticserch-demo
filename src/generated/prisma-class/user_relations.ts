import { Post } from './post';
import { Chat } from './chat';
import { Advertisement } from './advertisement';
import { AdvertisementChat } from './advertisement_chat';
import { AdvertisementMessage } from './advertisement_message';
import { Message } from './message';
import { ApiProperty } from '@nestjs/swagger';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => Post })
  posts: Post[];

  @ApiProperty({ isArray: true, type: () => Chat })
  chats: Chat[];

  @ApiProperty({ isArray: true, type: () => Advertisement })
  advertisements: Advertisement[];

  @ApiProperty({ isArray: true, type: () => AdvertisementChat })
  advertisementChats: AdvertisementChat[];

  @ApiProperty({ isArray: true, type: () => AdvertisementMessage })
  advertisementMessages: AdvertisementMessage[];

  @ApiProperty({ isArray: true, type: () => Message })
  Message: Message[];
}
