import { CreateAdvertisementDto } from './create-advertisement.dto';
import { IsDefined, IsInt } from 'class-validator';

export class UpdateAdvertisementDto extends CreateAdvertisementDto {
  @IsDefined()
  @IsInt()
  id: number;

  @IsDefined()
  @IsInt()
  views: number;
}
