import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { PostsModule } from "./posts/posts.module";
import { AuthGuard } from "./auth/guard/auth.guard";

@Module({
  imports: [ DatabaseModule, PostsModule ],
  controllers: [ AppController ],
  providers: [ AppService, AuthGuard ],
})
export class AppModule {
}
