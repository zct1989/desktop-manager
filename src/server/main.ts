import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from '../../server';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server1 = express();
  const { app: server } = await createServer(server1);
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(3000);
}
bootstrap();
