import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrimasService } from 'src/primas/primas.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrimasService],
})
export class StudentsModule {}
