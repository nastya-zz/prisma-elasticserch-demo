import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserByEmailNotFoundException } from '../user/exceptions/user-by-email-not-found.exception';
import { User } from '../generated/prisma-class/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = {
      email: user.email,
      name: user.name,
      id: user.id,
    };

    return {
      ...user,
      password: null,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new UserByEmailNotFoundException(email);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Некорректный пароль пользователя!');
    }

    return user;
  }
}
