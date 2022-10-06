import { CreatePostDto } from './create-post.dto';
import { IsDefined, IsInt } from 'class-validator';

export class UpdatePostDto extends CreatePostDto {
  @IsDefined()
  @IsInt()
  id: number;
}
