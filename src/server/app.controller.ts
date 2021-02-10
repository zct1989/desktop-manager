import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './services/user.service';

@Controller('api')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello() {
    return this.userService.findAll();
  }
}
