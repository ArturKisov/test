import { Get, Controller, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(@Res() res: Response): any {
    res.redirect('posts');
    return { message: 'hello' };
  }
}
