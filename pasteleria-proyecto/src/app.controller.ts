import {Body, Controller, Get, Param, Post, Query, Request, Res} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('home')
  home(@Res() res) {
    res.render('home');
  }
  @Get('nosotros')
  nosotros(@Res() res) {
    res.render('nosotros');
  }
}
