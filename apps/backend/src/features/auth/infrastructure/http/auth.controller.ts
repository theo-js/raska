import { Controller, Post } from '@nestjs/common';
import { SignupUserUsecase } from '../../application/signup-user.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly signupUserUsecase: SignupUserUsecase) {}

  @Post('signup')
  signUp() {
    return this.signupUserUsecase.execute();
  }
}
