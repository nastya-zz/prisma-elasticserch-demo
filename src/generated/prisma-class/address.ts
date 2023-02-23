import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Address {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Boolean })
  show: boolean;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiPropertyOptional({ type: String })
  coordinateX?: string;

  @ApiPropertyOptional({ type: String })
  coordinateY?: string;
}
