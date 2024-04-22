import { User } from '@prisma/client';
import { Request } from 'express';

interface UserEntity extends User {
  refreshToken?: string;
}

export interface RequestWithUser extends Request {
  user: UserEntity;
}
