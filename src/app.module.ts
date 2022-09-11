import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticModule } from './elastic/elastic.module';
import { ConfigModule } from '@nestjs/config';
// import PostSearchService from './post/post.service';
import { PrismaModule } from './prisma/prisma.module';
import { PostService } from './post/post.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostSearchModule } from './post-search/post-search.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ElasticModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    PrismaModule,
    UserModule,
    PostModule,
    PostSearchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // PostService,
    // PostSearchService
  ],
})
export class AppModule {}
