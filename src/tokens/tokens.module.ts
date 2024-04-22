import { Module } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { TokensService } from './tokens.service';
import { UserService } from '../user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../core/config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [PrismaService, UserService, TokensService, ConfigService],
  exports: [TokensService],
})
export class TokensModule {}
