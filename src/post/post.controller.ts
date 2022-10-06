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
import { PostService } from './post.service';
import { BasicResponse } from '../response/basic-response';
import { UserByIdNotFoundException } from '../user/exceptions/user-by-id-not-found.exception';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostNotFoundException } from './exceptions/postNotFound.exception';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserInfo } from '../decorators/user';
import { User } from '../generated/prisma-class/user';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(@Body(new ValidationPipe()) post: CreatePostDto) {
    try {
      const savedPost = await this.postService.createPost(post);
      return BasicResponse.getSuccess(savedPost, 'Пост успешно опубликован!');
    } catch (error) {
      let msg = 'При сохранении поста произошла ошибка!';
      if (error instanceof UserByIdNotFoundException) {
        msg = error.message;
      }

      return BasicResponse.getError(msg);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updatePost(@Body(new ValidationPipe()) post: UpdatePostDto) {
    try {
      const updatedPost = await this.postService.updatePost(post);
      return BasicResponse.getSuccess(updatedPost, 'Пост успешно обновлен!');
    } catch (err) {
      return BasicResponse.getError(new PostNotFoundException(post.id).message);
    }
  }

  @Get('list-by-user/:userId')
  async getPostsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const posts = await this.postService.getPostsByUserId(userId);
      return BasicResponse.getSuccess(posts, 'Посты успешно получены!');
    } catch (error) {
      return BasicResponse.getError(
        'При получении списка постов произошла ошибка!',
      );
    }
  }

  @Get('list')
  async getAllPosts() {
    try {
      const posts = await this.postService.getAllPosts();
      return BasicResponse.getSuccess(posts, 'Посты успешно получены!');
    } catch (_) {
      return BasicResponse.getError(
        'При получении списка постов произошла ошибка!',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(
    @Param('id', ParseIntPipe) postId: number,
    @UserInfo() user: User,
  ) {
    try {
      await this.postService.delete(postId, user);
      return BasicResponse.getSuccess(postId, 'Пост успешно удален!');
    } catch (error) {
      let msg = 'При удалении поста произошла ошибка!';
      if (error instanceof PostNotFoundException) {
        msg = error.message;
      }
      return BasicResponse.getError(msg);
    }
  }
}
