import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsInt,
  IsString,
} from 'class-validator';

export class CreateAdvertisementDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsBoolean()
  isNew = false;

  @IsDefined()
  @IsBoolean()
  isArchive = true;

  @IsDefined()
  @IsBoolean()
  canCall = true;

  @IsDefined()
  @IsBoolean()
  canMessage = true;

  @IsDefined()
  @IsInt()
  userId: number;

  @IsDefined()
  @IsString()
  coordinateX: string;

  @IsDefined()
  @IsString()
  coordinateY: string;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  images: string[];
}
