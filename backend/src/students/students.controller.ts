import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') cedula: number) {
    return this.studentsService.findOne(cedula);
  }

  @Patch(':id')
  update(
    @Param('id') cedula: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(cedula, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') cedula: number) {
    return this.studentsService.remove(cedula);
  }
}
