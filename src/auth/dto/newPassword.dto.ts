import { IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class NewPasswordDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  @Length(6, 30)
  password: string;

  @IsNotEmpty()
  @Length(6, 30)
  confirmPassword: string;

  @IsNotEmpty()
  @Length(6, 6)
  verify_code: string;
}
