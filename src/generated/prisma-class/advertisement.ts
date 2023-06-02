import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Advertisement {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  images: string;

  @ApiProperty({ type: Boolean })
  isNew: boolean;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Boolean })
  isArchive: boolean;

  @ApiProperty({ type: Boolean })
  isActive: boolean = true;

  @ApiProperty({ type: Boolean })
  canCall: boolean = true;

  @ApiProperty({ type: Boolean })
  canMessage: boolean = true;

  @ApiProperty({ type: Number })
  views: number;

  @ApiProperty({ type: Number })
  uniqueWatchers: number;

  @ApiProperty({ type: String })
  coordinateX: string;

  @ApiProperty({ type: String })
  coordinateY: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: String })
  messageId?: string;
}
