import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ElasticModule } from './elastic/elastic.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
// import { PostSearchModule } from './post-search/post-search.module';
import { AuthModule } from './auth/auth.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    // ElasticModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    PrismaModule,
    UserModule,
    PostModule,
    AuthModule,
    // PostSearchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // PostService,
    // PostSearchService
  ],
})
export class AppModule {}
