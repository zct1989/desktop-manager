import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from 'src/server/services/user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async getUsers() {
    return this.userService.findAll();
  }
}
