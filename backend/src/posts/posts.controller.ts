import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Post as PostModel } from './entities/post.entity';
import { Request, Response } from 'express';
import { PostsService } from './posts.service';
import { classToPlain, plainToClass } from 'class-transformer';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response as ResponseEntity } from './entities/response.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('create')
  @UseGuards(new AuthGuard())
  async addPost(
    @Body() data: CreatePostDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    let post = plainToClass<PostModel, object>(PostModel, data);
    post.user_name = req.cookies.user_name;
    let createdPost = await this.postsService.createPost(post);
    res.send(createdPost);
  }

  @Delete('remove')
  @UseGuards(new AuthGuard())
  async removePost(@Body() id: string, @Req() req: Request) {
    let username = req.cookies.user_name;
    let post = await this.postsService.getPostById(id);
    if (post.user_name === username) {
      return this.postsService.removePost(id);
    } else {
      return new HttpException('You are not author this post', 403);
    }
  }

  @Post(':id/addresponse')
  @UseGuards(new AuthGuard())
  async addComment(
    @Body() data: CreateResponseDto,
    @Param() params,
    @Req() req: Request,
  ) {
    let post = plainToClass<ResponseEntity, object>(ResponseEntity, data);
    post.user_name = req.cookies.user_name;
    return this.postsService.addResponseToPost(params.id, post);
  }

  @Delete('remove_response')
  @UseGuards(new AuthGuard())
  async removeComment(@Body() responseId: string, @Req() req: Request) {
    let username = req.cookies.user_name;
    let response = await this.postsService.getResponseById(responseId);
    if (response.user_name === username) {
      return this.postsService.removeResponse(response);
    } else {
      return new HttpException('You are not author this response', 403);
    }
  }

  @Get('create')
  @Render('create_post')
  renderCreatePost() {}

  @Get()
  @Render('posts')
  async getList() {
    let posts = await this.postsService.getAllPosts();
    return { posts: classToPlain(posts) };
  }

  @Get(':id')
  @Render('post')
  async getPost(@Param() params) {
    return {
      post: classToPlain(await this.postsService.getPostById(params.id)),
    };
  }
}
