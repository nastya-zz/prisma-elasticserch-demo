import { User } from './user';
import { AdvertisementChat } from './advertisement_chat';
import { Message } from './message';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdvertisementRelations {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ isArray: true, type: () => AdvertisementChat })
  chats: AdvertisementChat[];

  @ApiPropertyOptional({ type: () => Message })
  Message?: Message;
}
