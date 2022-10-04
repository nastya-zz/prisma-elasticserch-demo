import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserByIdNotFoundException } from '../user/exceptions/user-by-id-not-found.exception';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../generated/prisma-class/user';
import { Post } from '../generated/prisma-class/post';
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

  async delete(id: number, user: User) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new PostNotFoundException(id);
    }

    if (post.authorId !== user.id) {
      throw new ForbiddenException(
        'Действие запрещено. Данный пользователь не может удалить эту запись!',
      );
    }

    return this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
