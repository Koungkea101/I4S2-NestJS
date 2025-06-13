import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [StudentResolver],
})
export class StudentModule {}
