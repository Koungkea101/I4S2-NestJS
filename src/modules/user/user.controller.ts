import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './users.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findOneUser(Number(id));
  }

  @Post()
  createUser(@Body() userData: Partial<User>) {
    return this.userService.createUser(userData);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.userService.updateUser(Number(id), body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
  @Get('/getAllUsers')
  getAllUsers() {
    return this.userService.findAllUsers();
  }
}
