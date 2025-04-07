import { Students } from '@prisma/client';

export type CreateStudentDto = Omit<Students, 'createdAt' | 'updateAt'>;
