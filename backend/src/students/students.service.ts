import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrimasService } from 'src/primas/primas.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prismaServices: PrimasService) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      return await this.prismaServices.students.create({
        data: createStudentDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El estudiante con la cédula '${createStudentDto.cedula}' ya existe.`,
          );
        }
      }
    }
  }

  findAll(skip = 0, take = 10) {
    return this.prismaServices.students.findMany({
      skip,
      take,
    });
  }

  async findOne(cedula: number | string) {
    const numericCedula = Number(cedula); // Convertir a número
    if (isNaN(numericCedula)) {
      throw new NotFoundException(`La cédula proporcionada no es válida`);
    }

    const student = await this.prismaServices.students.findUnique({
      where: { cedula: numericCedula },
    });
    if (!student) {
      throw new NotFoundException(
        `El estudiante con cédula ${numericCedula} no fue encontrado`,
      );
    }
    return student;
  }

  async update(cedula: number | string, updateStudentDto: UpdateStudentDto) {
    const numericCedula = Number(cedula); // Convertir a número
    if (isNaN(numericCedula)) {
      throw new NotFoundException(`La cédula proporcionada no es válida`);
    }

    const updatedStudent = await this.prismaServices.students.update({
      where: { cedula: numericCedula },
      data: updateStudentDto,
    });
    if (!updatedStudent) {
      throw new NotFoundException(
        `El estudiante con cédula ${numericCedula} no fue encontrado para editar`,
      );
    }
    return {
      message: 'Estudiante editado',
      data: updatedStudent,
    };
  }

  async remove(cedula: number | string) {
    const numericCedula = Number(cedula); // Convertir a número
    if (isNaN(numericCedula)) {
      throw new NotFoundException(`La cédula proporcionada no es válida`);
    }

    const deletedStudent = await this.prismaServices.students.delete({
      where: { cedula: numericCedula },
    });
    if (!deletedStudent) {
      throw new NotFoundException(
        `El estudiante con cédula ${numericCedula} no fue encontrado para eliminar`,
      );
    }
    return {
      message: 'Estudiante eliminado',
      data: deletedStudent,
    };
  }
}
