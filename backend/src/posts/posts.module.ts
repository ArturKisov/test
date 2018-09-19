import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { postsProviders } from './entities/post.provider';
import { DatabaseModule } from '../core/database/database.module';
import { PostsService } from './posts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [...postsProviders, PostsService],
})
export class PostsModule {}
