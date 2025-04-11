import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
}
