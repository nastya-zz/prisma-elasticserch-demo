import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdvertisementChat {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  advertisementId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Number })
  userId?: number;
}
