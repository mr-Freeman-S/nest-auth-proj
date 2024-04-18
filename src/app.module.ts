import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/prisma/prismaModule.module';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
