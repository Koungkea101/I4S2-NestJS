import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  createUser(userData: Partial<User>) {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }

  findAllUsers() {
    return this.userRepo.find();
  }

  findOneUser(id: number) {
    return this.userRepo.findOne({ where: { id }, relations: ['tasks'] });
  }

  async updateUser(id: number, updateData: Partial<User>) {
    await this.userRepo.update(id, updateData);
    return this.userRepo.findOne({ where: { id } });
  }

  deleteUser(id: number) {
    return this.userRepo.delete(id);
  }
}
