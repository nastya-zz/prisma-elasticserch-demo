import { ApiProperty } from '@nestjs/swagger';

export class Chat {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Boolean })
  public: boolean;

  @ApiProperty({ type: Number })
  guests: number;
}
