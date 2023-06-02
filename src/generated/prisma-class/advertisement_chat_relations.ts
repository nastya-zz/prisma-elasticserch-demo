import { Advertisement } from './advertisement';
import { Message } from './message';
import { AdvertisementMessage } from './advertisement_message';
import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdvertisementChatRelations {
  @ApiProperty({ type: () => Advertisement })
  advertisement: Advertisement;

  @ApiProperty({ isArray: true, type: () => Message })
  messages: Message[];

  @ApiProperty({ isArray: true, type: () => AdvertisementMessage })
  AdvertisementMessage: AdvertisementMessage[];

  @ApiPropertyOptional({ type: () => User })
  User?: User;
}
