import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

import { User } from './entity/user.entity';
import { UserService } from './services/user.service';
import { UserResolver } from './graphql/resolvers/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '139.155.204.121',
      port: 32717,
      database: 'default',
      username: 'admin',
      password: '123456',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, UserResolver],
})
export class AppModule {}
