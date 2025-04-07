import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto): Promise<{
        cedula: number;
        createdAt: Date;
        updateAt: Date;
        name: string;
        lastName: string;
        year: number;
        secction: string;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        cedula: number;
        createdAt: Date;
        updateAt: Date;
        name: string;
        lastName: string;
        year: number;
        secction: string;
    }[]>;
    findOne(cedula: number): Promise<{
        cedula: number;
        createdAt: Date;
        updateAt: Date;
        name: string;
        lastName: string;
        year: number;
        secction: string;
    }>;
    update(cedula: number, updateStudentDto: UpdateStudentDto): Promise<{
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
    remove(cedula: number): Promise<{
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
