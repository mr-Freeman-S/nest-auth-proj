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
import { RegistrationDto, VerificationDto } from './dto/registration.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';
import { ResetPasswordDto } from './dto/restorePassword.dto';
import { NewPasswordDto } from './dto/newPassword.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.number, signInDto.password);
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
  @Post('verifyCandidate')
  verifyCandidate(@Body() verificationDto: VerificationDto) {
    return this.authService.verifyCandidate(
      verificationDto.number,
      verificationDto.verifyCode,
    );
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('restorePassword')
  restorePassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.restorePassword(resetPasswordDto.number);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refreshToken')
  refreshToken(@Body() refreshToken: refreshTokenDto) {
    return this.authService.refreshToken(refreshToken.refreshToken);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('newPassword')
  newPassword(@Body() newPasswordDto: NewPasswordDto) {
    return this.authService.newPasswordSet(newPasswordDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
