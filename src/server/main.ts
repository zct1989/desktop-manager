import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from '../../server';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as Express from 'express';

async function bootstrap() {
  const express = Express();
  const { app: server } = await createServer(express);
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(3000);
}

bootstrap();
