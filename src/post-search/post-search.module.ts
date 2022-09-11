import { Module } from '@nestjs/common';
import PostsSearchService from './post-search.service';
import { ElasticModule } from '../elastic/elastic.module';

@Module({
  imports: [ElasticModule],
  providers: [PostsSearchService],
  controllers: [],
})
export class PostSearchModule {}
