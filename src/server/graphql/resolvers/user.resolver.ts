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

  @Mutation('login')
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.login({ username, password });

    // 用户不存在则抛出错误
    if (!user) return new Error('用户名或密码错误');

    return user;
  }

  @Mutation('createRootUser')
  async createRootUser(@Args('password') password: string) {
    return this.userService.createRoot(password);
  }
}
