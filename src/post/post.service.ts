import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  // async createPost(post: CreatePostDto, user: User) {
  //   const categories = post.categoryIds?.map((category) => ({
  //     id: category,
  //   }));
  //
  //   return this.prismaService.post.create({
  //     data: {
  //       title: post.title,
  //       content: post.content,
  //       author: {
  //         connect: {
  //           id: user.id,
  //         },
  //       },
  //       categories: {
  //         connect: categories,
  //       },
  //     },
  //     include: {
  //       categories: true,
  //     },
  //   });
  // }
}
