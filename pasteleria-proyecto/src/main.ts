import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as path from "path";
import {join} from "path";
import * as favicon from 'serve-favicon';
import * as express from 'express';

//var cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(favicon(path.join(__dirname,'..','publico','imagenes','YITHOS.png')));
  //app.use(cookieParser('examen'));
  // @ts-ignore
  app.set('view engine', 'ejs');
  app.use(express.static('publico'));
  await app.listen(3100);
}
bootstrap();
