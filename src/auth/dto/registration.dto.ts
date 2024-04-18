import { IsNotEmpty, Length } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @Length(3, 30)
  @IsNotEmpty()
  password: string;

  @Length(3, 30)
  @IsNotEmpty()
  confirmPassword: string;
}
