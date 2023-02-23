import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PostSearchResult } from './types/postSearchResult.interface';
import { PostSearchBody } from './types/postSearchBody.interface';
import { Post } from '../generated/prisma-class/post';

@Injectable()
export default class PostsSearchService {
  index = 'posts';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.elasticsearchService.index<PostSearchResult, PostSearchBody>({
      index: this.index,
      body: {
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
      },
    });
  }

  // async search(text: string) {
  // const body = await this.elasticsearchService.search<PostSearchResult>({
  //   index: this.index,
  //   body: {
  //     query: {
  //       multi_match: {
  //         query: text,
  //         fields: ['title', 'content'],
  //       },
  //     },
  //   },
  // });
  // const hits = body?.body.hits.hits;
  // return hits.map((item) => item._source);
  // }
}
