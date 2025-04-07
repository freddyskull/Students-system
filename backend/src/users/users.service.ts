import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrimasService } from 'src/primas/primas.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaServices: PrimasService) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private selectFields = {
    id: true,
    cedula: true,
    userName: true,
    fullName: true,
    avatar: true,
    createdAt: true,
    updateAt: true,
  };

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      return await this.prismaServices.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El usuario con la cédula '${createUserDto.cedula}' y el nombre de usuario '${createUserDto.userName}' ya existe.`,
          );
        }
      }
      throw new InternalServerErrorException();
    }
  }

  findAll(skip = 0, take = 10) {
    return this.prismaServices.users.findMany({
      skip,
      take,
      select: this.selectFields,
    });
  }

  async findOne(id: string) {
    const userFound = await this.prismaServices.users.findUnique({
      where: {
        id: id,
      },
      select: this.selectFields,
    });
    if (!userFound) {
      throw new NotFoundException(`El usuario con id ${id} no fué encontrado`);
    }
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.prismaServices.users.update({
      where: {
        id,
      },
      data: updateUserDto,
      select: this.selectFields,
    });

    if (!findUser) {
      throw new NotFoundException(
        `El usuario con id ${id} no fué encontrado para editar`,
      );
    }
    return {
      message: 'Usuario editado',
      data: findUser,
    };
  }

  async login(cedula: number, password: string) {
    const user = await this.prismaServices.users.findUnique({
      where: { cedula },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { password: _, ...userWithoutPassword } = user; // Excluir el campo password
    return {
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
    };
  }

  async remove(id: string) {
    const deletedUser = await this.prismaServices.users.delete({
      where: {
        id: id,
      },
    });
    if (!deletedUser) {
      throw new NotFoundException(
        `El usuario con id ${id} no fué encontrado para eliminar`,
      );
    }
    return {
      message: 'Usuario eliminado',
      data: deletedUser,
    };
  }
}
