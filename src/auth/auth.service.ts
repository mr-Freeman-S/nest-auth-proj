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
import { CandidateService } from '../candidate/candidate.service';
import { TwilioSMSService } from '../twilioSMS/twilioSMS.servise';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private helperService: HelperService,
    private tokenService: TokensService,
    private candidateService: CandidateService,
    private twilioSMSService: TwilioSMSService,
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
  ): Promise<{ status: string }> {
    await this.userService.getUserByUsernameThrow(number);
    const candidate = await this.candidateService.getCandidate({ number });
    if (password !== confirmPassword) {
      throw new HttpException(
        AuthExceptions.PASSWORD_DOES_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    } else if (candidate) {
      throw new HttpException(
        AuthExceptions.ALREDY_REGISTERED,
        HttpStatus.BAD_REQUEST,
      );
    }

    const confirmCode = String(Math.floor(100000 + Math.random() * 900000));
    await this.twilioSMSService.sendSMS(number, confirmCode);
    await this.candidateService.createCandidate({
      number,
      password: await this.helperService.hashData(password),
      verify_code: confirmCode,
    });
    return { status: 'OK' };
  }

  async verifyCandidate(
    number: string,
    verifyCode: string,
  ): Promise<IJwtTokens> {
    const candidate = await this.candidateService.getCandidate({ number });

    if (candidate.verify_code !== verifyCode) {
      throw new HttpException(
        AuthExceptions.PASSWORD_DOES_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.createUser({
      number: candidate.number,
      password: candidate.password,
    });
    await this.candidateService.removeCandidate(candidate.id);
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

  async restorePassword(number: string): Promise<{ status: 'OK' }> {
    const verifyCode = String(Math.floor(100000 + Math.random() * 900000));

    const user = await this.userService.user({ number });

    if (!user) {
      throw new Error('User Not Found');
    }

    await this.twilioSMSService.sendSMS(number, verifyCode);

    return { status: 'OK' };
  }
}
