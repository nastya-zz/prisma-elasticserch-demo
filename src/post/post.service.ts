import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserByIdNotFoundException } from '../user/exceptions/user-by-id-not-found.exception';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostNotFoundException } from './exceptions/postNotFound.exception';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService, // private readonly postSearchService: PostsSearchService,
  ) {}

  async createPost(post: CreatePostDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: post.authorId,
      },
    });

    if (!user) {
      throw new UserByIdNotFoundException(user.id);
    }

    const newPost = await this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        show: post.show,
      },
    });

    // const resultIndex = await this.postSearchService.indexPost(newPost);

    // console.log(resultIndex);
    return newPost;
  }

  async getAllPosts() {
    return this.prismaService.post.findMany();
  }

  async updatePost(post: UpdatePostDto) {
    return this.prismaService.post.update({
      where: {
        id: post.id,
      },
      data: {
        title: post.title,
        content: post.content,
        show: post.show,
      },
    });
  }

  async getPostsByUserId(userId: number) {
    return this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async delete(id: number) {
    return this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
