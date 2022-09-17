import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class AddressRelations {
  @ApiProperty({ type: () => User })
  user: User;
}
