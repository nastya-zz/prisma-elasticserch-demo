import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: String })
  chatId: string;

  @ApiProperty({ type: Number })
  readUserIds: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
