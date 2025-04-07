import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrimasService } from './primas/primas.service';
import { StudentsModule } from './students/students.module';
@Module({
  imports: [UsersModule, StudentsModule],
  controllers: [],
  providers: [PrimasService],
})
export class AppModule {}
