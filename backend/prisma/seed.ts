import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

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
    cedula: faker.number.int({ min: 10000000, max: 99999999 }),
    userName: faker.internet.username(),
    fullName: faker.person.fullName(),
    password: bcrypt.hashSync(faker.internet.password(), 10),
    avatar: faker.image.avatar(),
  }));

  const exampleStudents = Array.from({ length: 25 }).map(() => ({
    cedula: faker.number.int({ min: 10000000, max: 99999999 }),
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    year: faker.number.int({ min: 2000, max: 2023 }),
    secction: faker.string.alpha({ length: 1 }).toUpperCase(),
    createdAt: faker.date.between({
      from: new Date(2000, 0, 1),
      to: new Date(),
    }),
  }));

  try {
    // Crear usuario por defecto
    await prisma.users.upsert({
      where: { cedula: defaultUser.cedula },
      update: {},
      create: defaultUser,
    });

    // Crear usuarios de ejemplo
    for (const user of exampleUsers) {
      await prisma.users.upsert({
        where: { cedula: user.cedula },
        update: {},
        create: user,
      });
    }

    // Crear estudiantes de ejemplo
    for (const student of exampleStudents) {
      await prisma.students.upsert({
        where: { cedula: student.cedula },
        update: {},
        create: student,
      });
    }

    console.log(
      'Datos de ejemplo generados con Faker.js creados exitosamente.',
    );
  } catch (error) {
    console.error('Error al crear los datos de ejemplo:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
