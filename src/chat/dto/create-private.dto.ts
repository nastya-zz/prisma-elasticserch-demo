import { IsBoolean, IsDefined, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrivateChatDto {
  @ApiProperty({ type: Number })
  @IsDefined()
  @IsInt()
  buyerId: number;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsInt()
  sellerId: number;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  public: boolean;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsInt()
  advertisementId: number;
}
