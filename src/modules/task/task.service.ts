import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  createTask(taskData: Partial<Task>) {
    const task = this.taskRepo.create(taskData);
    return this.taskRepo.save(task);
  }

  findAllTasks() {
    return this.taskRepo.find();
  }

  findOneTask(id: number) {
    return this.taskRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async updateTask(id: number, updateData: Partial<Task>) {
    await this.taskRepo.update(id, updateData);
    return this.taskRepo.findOne({ where: { id }, relations: ['user'] });
  }

  deleteTask(id: number) {
    return this.taskRepo.delete(id);
  }
}
