import { User } from '../../generated/prisma-class/user';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizedUserDto extends User {
  @ApiProperty({ type: String })
  access_token: string;

  password: null;
}
