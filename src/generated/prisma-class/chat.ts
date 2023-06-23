import { ApiProperty } from '@nestjs/swagger';

export class Chat {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Number })
  buyerId: number;

  @ApiProperty({ type: Number })
  sellerId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Boolean })
  public: boolean;

  @ApiProperty({ type: Number })
  advertisementId: number;
}
