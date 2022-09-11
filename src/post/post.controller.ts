import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { BasicResponse } from '../response/basic-response';
import { UserNotFoundException } from '../user/exceptions/userNotFound.exception';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @HttpCode(201)
  async createPost(@Body() post: CreatePostDto) {
    try {
      const savedPost = await this.postService.createPost(post);
      return new BasicResponse.builder()
        .setSuccess(true)
        .setMessage('Пост успешно опубликован!')
        .setData(savedPost);
    } catch (error) {
      let msg = 'При сохранении поста произошла ошибка!';
      if (error instanceof UserNotFoundException) {
        msg = error.message;
      }

      return new BasicResponse.builder()
        .setSuccess(false)
        .setMessage(msg)
        .setData(null);
    }
  }
}
