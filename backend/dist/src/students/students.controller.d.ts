import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto): Promise<{
        cedula: number;
        name: string;
        lastName: string;
        year: number;
        secction: string;
        createdAt: Date;
        updateAt: Date;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        cedula: number;
        name: string;
        lastName: string;
        year: number;
        secction: string;
        createdAt: Date;
        updateAt: Date;
    }[]>;
    findOne(cedula: number): Promise<{
        cedula: number;
        name: string;
        lastName: string;
        year: number;
        secction: string;
        createdAt: Date;
        updateAt: Date;
    }>;
    update(cedula: number, updateStudentDto: UpdateStudentDto): Promise<{
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
    remove(cedula: number): Promise<{
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
