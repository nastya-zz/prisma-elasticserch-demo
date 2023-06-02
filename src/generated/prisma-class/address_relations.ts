import { User } from './user';
import { Advertisement } from './advertisement';
import { ApiProperty } from '@nestjs/swagger';

export class AddressRelations {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ isArray: true, type: () => Advertisement })
  Advertisement: Advertisement[];
}
