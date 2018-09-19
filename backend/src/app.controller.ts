import { Get, Controller, Render, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Redirect } from "@nestjs/common/decorators/http/redirect.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @Redirect('posts')
  root(): any {

  }
}
