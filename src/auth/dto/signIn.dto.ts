import { IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  number: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
