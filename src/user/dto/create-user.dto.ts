import { Address } from '../../generated/prisma-class/address';
import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsOptional()
  address?: Address;
}
