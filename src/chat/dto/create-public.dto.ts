import { IsBoolean, IsDefined, IsInt, IsString } from 'class-validator';

export class CreatePublicChatDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsInt()
  authorId: number;

  @IsDefined()
  @IsBoolean()
  public: boolean;
}
