import { IsBoolean, IsDefined, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrivateChatDto {
  @ApiProperty({ type: Number })
  @IsDefined()
  @IsInt()
  authorId: number;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  public: boolean;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsInt()
  guestId: number;
}
