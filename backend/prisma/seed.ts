import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
  } catch (error) {
    console.error('Error al crear el usuario por defecto:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
