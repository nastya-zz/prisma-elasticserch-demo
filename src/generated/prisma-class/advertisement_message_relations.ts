import { User } from './user';
import { AdvertisementChat } from './advertisement_chat';
import { ApiProperty } from '@nestjs/swagger';

export class AdvertisementMessageRelations {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: () => AdvertisementChat })
  chat: AdvertisementChat;
}
