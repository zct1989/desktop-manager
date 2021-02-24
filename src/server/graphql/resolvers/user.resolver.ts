import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from 'src/server/services/user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async getUsers() {
    return this.userService.findAll();
  }

  @Query('root')
  async getRoot() {
    return this.userService.findRoot();
  }

  @Mutation('createRootUser')
  async createRootUser(@Args('password') password: string) {
    return this.userService.createRoot(password);
  }
}
