import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { HelperModule } from '../helper/helper.module';
import { TokensService } from '../tokens/tokens.service';
import { PrismaService } from '../core/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CandidateService } from '../candidate/candidate.service';
import { TwilioSMSService } from '../twilioSMS/twilioSMS.servise';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
    PassportModule,
    HelperModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
    TokensService,
    PrismaService,
    ConfigService,
    CandidateService,
    TwilioSMSService,
  ],
})
export class AuthModule {}
