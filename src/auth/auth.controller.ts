import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './constants';
import { RegistrationDto } from './dto/registration.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('registration')
  signUp(@Body() signUpDto: RegistrationDto) {
    console.log(signUpDto);
    console.log();
    return this.authService.signUp(
      signUpDto.number,
      signUpDto.password,
      signUpDto.confirmPassword,
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refreshToken')
  refreshToken(@Body() refreshToken: refreshTokenDto) {
    return this.authService.refreshToken(refreshToken.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
