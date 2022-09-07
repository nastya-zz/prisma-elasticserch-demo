import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BasicResponse } from '../response/basic-response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() user: CreateUserDto) {
    try {
      await this.userService.createUser(user);

      return;
    } catch (error) {
      console.log(error);
      return new BasicResponse.builder()
        .setSuccess(false)
        .setMessage('Ошибка при регистрации')
        .build();
    }
  }
}
