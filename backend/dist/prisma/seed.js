"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash('defaultPassword123', 10);
    const defaultUser = {
        cedula: 12345678,
        userName: 'admin',
        fullName: '123456',
        password: hashedPassword,
        avatar: null,
    };
    try {
        await prisma.users.upsert({
            where: { cedula: defaultUser.cedula },
            update: {},
            create: defaultUser,
        });
        console.log('Usuario por defecto creado exitosamente.');
    }
    catch (error) {
        console.error('Error al crear el usuario por defecto:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed.js.map