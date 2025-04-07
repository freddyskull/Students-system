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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const primas_service_1 = require("../primas/primas.service");
const client_1 = require("@prisma/client");
let StudentsService = class StudentsService {
    prismaServices;
    constructor(prismaServices) {
        this.prismaServices = prismaServices;
    }
    async create(createStudentDto) {
        try {
            return await this.prismaServices.students.create({
                data: createStudentDto,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException(`El estudiante con la cédula '${createStudentDto.cedula}' ya existe.`);
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
    async findOne(cedula) {
        const numericCedula = Number(cedula);
        if (isNaN(numericCedula)) {
            throw new common_1.NotFoundException(`La cédula proporcionada no es válida`);
        }
        const student = await this.prismaServices.students.findUnique({
            where: { cedula: numericCedula },
        });
        if (!student) {
            throw new common_1.NotFoundException(`El estudiante con cédula ${numericCedula} no fue encontrado`);
        }
        return student;
    }
    async update(cedula, updateStudentDto) {
        const numericCedula = Number(cedula);
        if (isNaN(numericCedula)) {
            throw new common_1.NotFoundException(`La cédula proporcionada no es válida`);
        }
        const updatedStudent = await this.prismaServices.students.update({
            where: { cedula: numericCedula },
            data: updateStudentDto,
        });
        if (!updatedStudent) {
            throw new common_1.NotFoundException(`El estudiante con cédula ${numericCedula} no fue encontrado para editar`);
        }
        return {
            message: 'Estudiante editado',
            data: updatedStudent,
        };
    }
    async remove(cedula) {
        const numericCedula = Number(cedula);
        if (isNaN(numericCedula)) {
            throw new common_1.NotFoundException(`La cédula proporcionada no es válida`);
        }
        const deletedStudent = await this.prismaServices.students.delete({
            where: { cedula: numericCedula },
        });
        if (!deletedStudent) {
            throw new common_1.NotFoundException(`El estudiante con cédula ${numericCedula} no fue encontrado para eliminar`);
        }
        return {
            message: 'Estudiante eliminado',
            data: deletedStudent,
        };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [primas_service_1.PrimasService])
], StudentsService);
//# sourceMappingURL=students.service.js.map