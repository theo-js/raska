import { Body, Controller, Post } from '@nestjs/common';
import { SignupUserUsecase } from '../../application/signup-user.usecase';
import type { SignupUserRequestDto } from './dto/signup-user.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signupUserUsecase: SignupUserUsecase) {}

  @Post('signup')
  signUp(@Body() { email, password }: SignupUserRequestDto): Promise<void> {
    return this.signupUserUsecase.execute({ email, password });
  }
}
