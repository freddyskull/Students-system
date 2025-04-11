import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrimasService } from 'src/primas/primas.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prismaServices;
    constructor(prismaServices: PrimasService);
    private hashPassword;
    private selectFields;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        cedula: number;
        userName: string;
        fullName: string;
        avatar: string | null;
        password: string;
        createdAt: Date;
        updateAt: Date;
    }>;
    findAll(skip?: number, take?: number): Prisma.PrismaPromise<{
        id: string;
        cedula: number;
        userName: string;
        fullName: string;
        avatar: string | null;
        createdAt: Date;
        updateAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        cedula: number;
        userName: string;
        fullName: string;
        avatar: string | null;
        createdAt: Date;
        updateAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: {
            id: string;
            cedula: number;
            userName: string;
            fullName: string;
            avatar: string | null;
            createdAt: Date;
            updateAt: Date;
        };
    }>;
    login(cedula: number | string, password: string): Promise<{
        message: string;
        user: {
            id: string;
            cedula: number;
            userName: string;
            fullName: string;
            avatar: string | null;
            createdAt: Date;
            updateAt: Date;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: {
            id: string;
            cedula: number;
            userName: string;
            fullName: string;
            avatar: string | null;
            password: string;
            createdAt: Date;
            updateAt: Date;
        };
    }>;
}
