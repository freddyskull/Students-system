import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrimasService } from 'src/primas/primas.service';
import { Prisma } from '@prisma/client';
export declare class StudentsService {
    private prismaServices;
    constructor(prismaServices: PrimasService);
    create(createStudentDto: CreateStudentDto): Promise<{
        cedula: number;
        name: string;
        lastName: string;
        year: number;
        secction: string;
        createdAt: Date;
        updateAt: Date;
    } | undefined>;
    findAll(): Prisma.PrismaPromise<{
        cedula: number;
        name: string;
        lastName: string;
        year: number;
        secction: string;
        createdAt: Date;
        updateAt: Date;
    }[]>;
    findOne(cedula: number | string): Promise<{
        cedula: number;
        name: string;
        lastName: string;
        year: number;
        secction: string;
        createdAt: Date;
        updateAt: Date;
    }>;
    update(cedula: number | string, updateStudentDto: UpdateStudentDto): Promise<{
        message: string;
        data: {
            cedula: number;
            name: string;
            lastName: string;
            year: number;
            secction: string;
            createdAt: Date;
            updateAt: Date;
        };
    }>;
    remove(cedula: number | string): Promise<{
        message: string;
        data: {
            cedula: number;
            name: string;
            lastName: string;
            year: number;
            secction: string;
            createdAt: Date;
            updateAt: Date;
        };
    }>;
}
