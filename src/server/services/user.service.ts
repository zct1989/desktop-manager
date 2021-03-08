import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserRole } from '../config/dict.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async login({ username, password }) {
    return await this.userRepository.findOne({
      username,
      password,
    });
  }

  public async findAll() {
    return await this.userRepository.find();
  }

  // 朝朝超级管理员
  public async findRoot() {
    return await this.userRepository.findOne({
      role: UserRole.root,
    });
  }

  // 朝朝超级管理员
  public async createRoot(password: string) {
    return await this.userRepository.save({
      username: 'root',
      role: UserRole.root,
      password,
    });
  }
}
