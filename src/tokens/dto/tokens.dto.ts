import { User } from '@prisma/client';

export interface IToken {
  user: User;
  refreshToken: string;
}

export interface IJwtTokens {
  accessToken: string;
  refreshToken: string;
}
