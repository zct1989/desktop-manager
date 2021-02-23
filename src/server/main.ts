import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from './ssr';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as Express from 'express';

const PROD = process.env.NODE_ENV == 'production';
const port = PROD ? 80 : 3000;

async function bootstrap() {
  const express = Express();
  const { app: server } = await createServer(express);
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(port);
}

bootstrap();
