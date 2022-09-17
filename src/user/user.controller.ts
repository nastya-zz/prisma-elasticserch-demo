import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { BasicResponse } from '../response/basic-response';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() user: CreateUserDto) {
    try {
      const savedUser = await this.userService.createUser(user);

      return new BasicResponse.builder()
        .setSuccess(true)
        .setData(savedUser.name)
        .setMessage('Пользователь успешно сохранен!')
        .build();
    } catch (error) {
      console.log(error);
      const msg =
        error instanceof UserAlreadyExistException
          ? error.message
          : 'Ошибка при регистрации';
      return new BasicResponse.builder()
        .setSuccess(false)
        .setMessage(msg)
        .build();
    }
  }
}
