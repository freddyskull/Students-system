// export class CreateUserDto {}
import { Users } from '@prisma/client';

export type CreateUserDto = Omit<Users, 'id' | 'createdAt' | 'updateAt'>;
