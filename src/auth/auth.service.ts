import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthExceptions } from '../core/constants/auth.contacts';
import { HelperService } from '../helper/helper.servise';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private helperService: HelperService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.user({ email });

    const isValid = await this.helperService.compareHashData(
      pass,
      user.password,
    );

    if (isValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<{ access_token: string }> {
    await this.userService.getUserByUsernameThrow(email);
    if (password !== confirmPassword) {
      throw new HttpException(
        AuthExceptions.PASSWORD_DOES_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.userService.createUser({
      email,
      password: await this.helperService.hashData(password),
    });
    const payload = { sub: newUser.id, email: newUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
