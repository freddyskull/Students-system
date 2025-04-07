import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrimasService } from 'src/primas/primas.service';
import { Prisma } from '@prisma/client';
export declare class StudentsService {
    private prismaServices;
    constructor(prismaServices: PrimasService);
    create(createStudentDto: CreateStudentDto): Promise<{
        cedula: number;
        createdAt: Date;
        updateAt: Date;
        name: string;
        lastName: string;
        year: number;
        secction: string;
    } | undefined>;
    findAll(skip?: number, take?: number): Prisma.PrismaPromise<{
        cedula: number;
        createdAt: Date;
        updateAt: Date;
        name: string;
        lastName: string;
        year: number;
        secction: string;
    }[]>;
    findOne(cedula: number | string): Promise<{
        cedula: number;
        createdAt: Date;
        updateAt: Date;
        name: string;
        lastName: string;
        year: number;
        secction: string;
    }>;
    update(cedula: number | string, updateStudentDto: UpdateStudentDto): Promise<{
        message: string;
        data: {
            cedula: number;
            createdAt: Date;
            updateAt: Date;
            name: string;
            lastName: string;
            year: number;
            secction: string;
        };
    }>;
    remove(cedula: number | string): Promise<{
        message: string;
        data: {
            cedula: number;
            createdAt: Date;
            updateAt: Date;
            name: string;
            lastName: string;
            year: number;
            secction: string;
        };
    }>;
}
