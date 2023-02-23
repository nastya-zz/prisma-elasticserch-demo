import { IsBoolean, IsDefined, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicChatDto {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({ type: Number })
  @IsDefined()
  @IsInt()
  authorId: number;

  @ApiProperty({ type: Boolean })
  @IsDefined()
  @IsBoolean()
  public: boolean;
}
