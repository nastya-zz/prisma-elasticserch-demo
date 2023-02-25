import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizedUserDto } from './dto/authorized-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authorized',
    type: AuthorizedUserDto,
  })
  async login(
    @Body() { email, password }: AuthDto,
  ): Promise<AuthorizedUserDto> {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }
}
