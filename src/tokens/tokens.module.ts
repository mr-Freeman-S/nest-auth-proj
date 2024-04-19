import { Module } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { TokensService } from './tokens.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [TokensService],
})
export class TokensModule {}
