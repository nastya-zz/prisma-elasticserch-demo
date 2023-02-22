import { IsBoolean, IsDefined, IsInt } from 'class-validator';

export class CreatePrivateChatDto {
  @IsDefined()
  @IsInt()
  authorId: number;

  @IsDefined()
  @IsBoolean()
  public: boolean;

  @IsDefined()
  @IsInt()
  guestId: number;
}
