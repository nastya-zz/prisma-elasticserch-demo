import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';
// import { PostSearchModule } from '../post-search/post-search.module';
// import PostsSearchService from '../post-search/post-search.service';

// import { ElasticService } from '../elastic/elastic.service';
// import { ElasticModule } from '../elastic/elastic.module';

@Module({
  imports: [PrismaModule /*, PostSearchModule, ElasticModule*/],
  providers: [PostService /*, PostsSearchService, ElasticService*/],
  controllers: [PostController],
})
export class PostModule {}
