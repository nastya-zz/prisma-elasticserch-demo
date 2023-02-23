import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { BasicResponse } from '../response/basic-response';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe())
    user: CreateUserDto,
  ) {
    try {
      const savedUser = await this.userService.createUser(user);
      return BasicResponse.getSuccess(
        savedUser,
        'Пользователь успешно создан!',
      );
    } catch (error) {
      console.log(error);
      const msg =
        error instanceof UserAlreadyExistException
          ? error.message
          : 'Ошибка при регистрации';

      return BasicResponse.getError(msg);
    }
  }
}
