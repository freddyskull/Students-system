"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash('defaultPassword123', 10);
    const defaultUser = {
        cedula: 12345678,
        userName: 'admin',
        fullName: 'admin',
        password: hashedPassword,
        avatar: null,
    };
    const exampleUsers = Array.from({ length: 10 }).map(() => ({
        cedula: faker_1.faker.number.int({ min: 10000000, max: 99999999 }),
        userName: faker_1.faker.internet.username(),
        fullName: faker_1.faker.person.fullName(),
        password: bcrypt.hashSync(faker_1.faker.internet.password(), 10),
        avatar: faker_1.faker.image.avatar(),
    }));
    const exampleStudents = Array.from({ length: 25 }).map(() => ({
        cedula: faker_1.faker.number.int({ min: 10000000, max: 99999999 }),
        name: faker_1.faker.person.firstName(),
        lastName: faker_1.faker.person.lastName(),
        year: faker_1.faker.number.int({ min: 1994, max: 2023 }),
        secction: faker_1.faker.string.alpha({ length: 1 }).toUpperCase(),
    }));
    try {
        await prisma.users.upsert({
            where: { cedula: defaultUser.cedula },
            update: {},
            create: defaultUser,
        });
        for (const user of exampleUsers) {
            await prisma.users.upsert({
                where: { cedula: user.cedula },
                update: {},
                create: user,
            });
        }
        for (const student of exampleStudents) {
            await prisma.students.upsert({
                where: { cedula: student.cedula },
                update: {},
                create: student,
            });
        }
        console.log('Datos de ejemplo generados con Faker.js creados exitosamente.');
    }
    catch (error) {
        console.error('Error al crear los datos de ejemplo:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed.js.map