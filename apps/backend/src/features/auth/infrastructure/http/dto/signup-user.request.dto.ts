import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupUserRequestDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
