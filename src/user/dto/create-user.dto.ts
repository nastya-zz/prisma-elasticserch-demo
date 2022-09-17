import { Address } from '../../generated/prisma-class/address';

export class CreateUserDto {
  email: string;

  name: string;

  password: string;

  address?: Address;
}
