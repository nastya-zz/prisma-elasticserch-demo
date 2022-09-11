import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UserNotFoundException } from '../user/exceptions/userNotFound.exception';
import PostsSearchService from '../post-search/post-search.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postSearchService: PostsSearchService,
  ) {}

  async createPost(post: CreatePostDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: post.userId,
      },
    });

    if (!user) {
      throw new UserNotFoundException(post.userId);
    }

    const newPost = await this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // const resultIndex = await this.postSearchService.indexPost(newPost);

    // console.log(resultIndex);
    return newPost;
  }
}
