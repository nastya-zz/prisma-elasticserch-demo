import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { BasicResponse } from '../response/basic-response';
import { UserByIdNotFoundException } from '../user/exceptions/user-by-id-not-found.exception';
import { AdvertisementService } from './advertisement.service';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { UserInfo } from '../decorators/user';
import { User } from '../generated/prisma-class/user';
import { AdvertisementNotFoundException } from './exceptions/advertisementNotFound.exception';

@ApiTags('advertisement')
@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAdvertisement(
    @Body(new ValidationPipe()) advertisement: CreateAdvertisementDto,
  ) {
    try {
      const savedAdvertisement =
        await this.advertisementService.createAdvertisement(advertisement);
      return BasicResponse.getSuccess(
        savedAdvertisement,
        'Объявление успешно опубликовано!',
      );
    } catch (error) {
      let msg = 'При сохранении объявления произошла ошибка!';
      if (error instanceof UserByIdNotFoundException) {
        msg = error.message;
      }

      return BasicResponse.getError(msg);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateAdvertisement(
    @Body(new ValidationPipe()) advertisement: UpdateAdvertisementDto,
  ) {
    try {
      const updatedAdvertisement =
        await this.advertisementService.updateAdvertisement(advertisement);
      return BasicResponse.getSuccess(
        updatedAdvertisement,
        'Объявление успешно обновлено!',
      );
    } catch (err) {
      return BasicResponse.getError(
        new AdvertisementNotFoundException(advertisement.id).message,
      );
    }
  }

  @Put('update-views/:id')
  async updateAdvertisementViews(
    @Param('id', ParseIntPipe) advertisementId: number,
  ) {
    try {
      const updatedAdvertisement =
        await this.advertisementService.updateAdvertisementViews(
          advertisementId,
        );
      return BasicResponse.getSuccess(
        updatedAdvertisement,
        'Объявление успешно обновлено!',
      );
    } catch (err) {
      return BasicResponse.getError(
        new AdvertisementNotFoundException(advertisementId).message,
      );
    }
  }

  @Get('list-by-user/:userId')
  async getPostsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const posts = await this.advertisementService.getAdvertisementByUserId(
        userId,
      );
      return BasicResponse.getSuccess(posts, 'Объявления успешно получены!');
    } catch (error) {
      return BasicResponse.getError(
        'При получении списка объявлений произошла ошибка!',
      );
    }
  }

  @Get('list')
  async getAllPosts() {
    try {
      const posts = await this.advertisementService.getAllAdvertisement();
      return BasicResponse.getSuccess(posts, 'Объявления успешно получены!');
    } catch (_) {
      return BasicResponse.getError(
        'При получении списка объявлений произошла ошибка!',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(
    @Param('id', ParseIntPipe) advertisementId: number,
    @UserInfo() user: User,
  ) {
    try {
      await this.advertisementService.delete(advertisementId, user);
      return BasicResponse.getSuccess(
        advertisementId,
        'Объявление успешно удалено!',
      );
    } catch (error) {
      let msg = 'При удалении объявления произошла ошибка!';
      if (error instanceof AdvertisementNotFoundException) {
        msg = error.message;
      }
      return BasicResponse.getError(msg);
    }
  }
}
