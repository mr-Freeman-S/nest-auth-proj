import { IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @Length(3, 30)
  @IsPhoneNumber()
  number: string;

  @Length(3, 30)
  @IsNotEmpty()
  password: string;

  @Length(3, 30)
  @IsNotEmpty()
  confirmPassword: string;
}
