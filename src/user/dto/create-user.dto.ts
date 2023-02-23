import { Address } from '../../generated/prisma-class/address';
import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  password: string;

  @ApiProperty({ type: Address })
  @IsOptional()
  address?: Address;
}
