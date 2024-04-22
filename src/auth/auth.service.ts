import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthExceptions } from '../core/constants/auth.contacts';
import { HelperService } from '../helper/helper.servise';
import { TokensService } from '../tokens/tokens.service';
import { IJwtTokens } from '../tokens/dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private helperService: HelperService,
    private tokenService: TokensService,
  ) {}

  async signIn(number: string, pass: string): Promise<IJwtTokens> {
    const user = await this.userService.user({ number });

    const isValid = await this.helperService.compareHashData(
      pass,
      user.password,
    );

    if (isValid) {
      throw new UnauthorizedException();
    }

    return await this.tokenService.generateTokens(user.number, user.id);
  }

  async signUp(
    number: string,
    password: string,
    confirmPassword: string,
  ): Promise<IJwtTokens> {
    console.log(number, password);
    await this.userService.getUserByUsernameThrow(number);
    if (password !== confirmPassword) {
      throw new HttpException(
        AuthExceptions.PASSWORD_DOES_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.userService.createUser({
      number,
      password: await this.helperService.hashData(password),
    });
    const tokens = await this.tokenService.generateTokens(
      newUser.number,
      newUser.id,
    );

    await this.tokenService.saveToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(refreshToken: string): Promise<IJwtTokens> {
    console.log(refreshToken);
    const tokenData = await this.tokenService.findToken(refreshToken);
    console.log('tokenData', tokenData);
    const userData = await this.tokenService.validateTokens(refreshToken);
    console.log('userData', userData);

    if (!tokenData || !userData) {
      throw new HttpException(AuthExceptions.TOKEN_FAULT, HttpStatus.FORBIDDEN);
    }
    const user = await this.userService.user({ number: userData.number });
    const tokens = await this.tokenService.generateTokens(user.number, user.id);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
