import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
// import Post from './post.entity';
import { PostSearchResult } from './posts/types/PostSearchResult.interface';
import { PostSearchBody } from './posts/types/postSearchBody.interface';

@Injectable()
export default class PostsSearchService {
  index = 'posts';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // async indexPost(post: Post) {
  // @ts-ignore
  // return this.elasticsearchService.index<PostSearchResult, PostSearchBody>({
  //   index: this.index,
  //   body: {
  //     id: post.id,
  //     title: post.title,
  //     content: post.content,
  //     authorId: post.author.id,
  //   },
  // });
  // }

  async search(text: string) {
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
  }
}
