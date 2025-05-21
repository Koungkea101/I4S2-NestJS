import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.taskService.findOneTask(Number(id));
  }
  @Post('a')
  createTask(@Body() taskData: Partial<Task>) {
    return this.taskService.createTask(taskData);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() body: Partial<Task>) {
    return this.taskService.updateTask(Number(id), body);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(Number(id));
  }
  @Get('/getAllTasks')
  getAllTasks() {
    return this.taskService.findAllTasks();
  }
}
