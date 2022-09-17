import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../generated/prisma-class/user';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: CreateUserDto) {
    const createdUser: User = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (createdUser) {
      throw new UserAlreadyExistException(createdUser.email);
    }

    //todo check user exist
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.prismaService.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
}
