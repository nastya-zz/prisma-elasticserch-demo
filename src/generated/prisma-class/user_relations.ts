import { Post } from './post';
import { Address } from './address';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserRelations {
  @ApiProperty({ isArray: true, type: () => Post })
  posts: Post[];

  @ApiPropertyOptional({ type: () => Address })
  address?: Address;
}
