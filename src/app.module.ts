import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/prisma/prismaModule.module';
import { HelperModule } from './helper/helper.module';
import { TokensModule } from './tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { CandidateModule } from './candidate/candidate.module';
import { twilioSMSModule } from './twilioSMS/twilioSMS.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    HelperModule,
    TokensModule,
    twilioSMSModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    CandidateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
