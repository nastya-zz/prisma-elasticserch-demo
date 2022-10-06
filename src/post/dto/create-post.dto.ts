import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  content: string;

  @IsDefined()
  @IsBoolean()
  show: boolean;

  @IsDefined()
  @IsInt()
  authorId: number;
}
