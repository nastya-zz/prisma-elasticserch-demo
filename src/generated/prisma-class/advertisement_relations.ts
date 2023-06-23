import { User } from './user';
import { Chat } from './chat';
import { Message } from './message';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdvertisementRelations {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ isArray: true, type: () => Chat })
  chats: Chat[];

  @ApiPropertyOptional({ type: () => Message })
  Message?: Message;
}
