import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { BasicResponse } from '../response/basic-response';
import { UserNotFoundException } from '../user/exceptions/user-not-found.exception';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostNotFoundException } from './exceptions/postNotFound.exception';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @HttpCode(201)
  async createPost(@Body() post: CreatePostDto) {
    try {
      const savedPost = await this.postService.createPost(post);
      return BasicResponse.getSuccess(savedPost, 'Пост успешно опубликован!');
    } catch (error) {
      let msg = 'При сохранении поста произошла ошибка!';
      if (error instanceof UserNotFoundException) {
        msg = error.message;
      }

      return BasicResponse.getError(msg);
    }
  }

  @Put('update')
  async updatePost(@Body() post: UpdatePostDto) {
    try {
      const updatedPost = await this.postService.updatePost(post);
      return BasicResponse.getSuccess(updatedPost, 'Пост успешно обновлен!');
    } catch (err) {
      return BasicResponse.getError(new PostNotFoundException(post.id).message);
    }
  }

  @Get('list-by-user/:userId')
  async getPostsByUserId(@Param('userId') userId: string) {
    try {
      const posts = await this.postService.getPostsByUserId(Number(userId));
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

  //todo check access to delete
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      await this.postService.delete(Number(id));
      return BasicResponse.getSuccess(id, 'Пост успешно удален!');
    } catch (error) {
      return BasicResponse.getError('При удалении поста произошла ошибка!');
    }
  }
}
