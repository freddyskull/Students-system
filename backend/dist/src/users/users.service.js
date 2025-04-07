"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const primas_service_1 = require("../primas/primas.service");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    prismaServices;
    constructor(prismaServices) {
        this.prismaServices = prismaServices;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    selectFields = {
        id: true,
        cedula: true,
        userName: true,
        fullName: true,
        avatar: true,
        createdAt: true,
        updateAt: true,
    };
    async create(createUserDto) {
        try {
            const hashedPassword = await this.hashPassword(createUserDto.password);
            return await this.prismaServices.users.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException(`El usuario con la cédula '${createUserDto.cedula}' y el nombre de usuario '${createUserDto.userName}' ya existe.`);
                }
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    findAll(skip = 0, take = 10) {
        return this.prismaServices.users.findMany({
            skip,
            take,
            select: this.selectFields,
        });
    }
    async findOne(id) {
        const userFound = await this.prismaServices.users.findUnique({
            where: {
                id: id,
            },
            select: this.selectFields,
        });
        if (!userFound) {
            throw new common_1.NotFoundException(`El usuario con id ${id} no fué encontrado`);
        }
        return userFound;
    }
    async update(id, updateUserDto) {
        const findUser = await this.prismaServices.users.update({
            where: {
                id,
            },
            data: updateUserDto,
            select: this.selectFields,
        });
        if (!findUser) {
            throw new common_1.NotFoundException(`El usuario con id ${id} no fué encontrado para editar`);
        }
        return {
            message: 'Usuario editado',
            data: findUser,
        };
    }
    async login(cedula, password) {
        const user = await this.prismaServices.users.findUnique({
            where: { cedula },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const { password: _, ...userWithoutPassword } = user;
        return {
            message: 'Inicio de sesión exitoso',
            user: userWithoutPassword,
        };
    }
    async remove(id) {
        const deletedUser = await this.prismaServices.users.delete({
            where: {
                id: id,
            },
        });
        if (!deletedUser) {
            throw new common_1.NotFoundException(`El usuario con id ${id} no fué encontrado para eliminar`);
        }
        return {
            message: 'Usuario eliminado',
            data: deletedUser,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [primas_service_1.PrimasService])
], UsersService);
//# sourceMappingURL=users.service.js.map