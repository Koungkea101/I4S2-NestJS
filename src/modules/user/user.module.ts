import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Add your User entity here
  controllers: [UserController],
  providers: [UserService],
  exports: [],
  // Add any other necessary configurations or modules
})
export class UserModule {}
