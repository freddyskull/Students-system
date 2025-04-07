import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrimasService } from 'src/primas/primas.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrimasService],
})
export class UsersModule {}
