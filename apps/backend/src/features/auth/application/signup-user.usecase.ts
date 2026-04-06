import { Inject } from '@nestjs/common';
import { UseCase } from 'src/core/application/UseCase';
import type { UserRepository } from 'src/features/user/domain/UserRepository';
import type { PasswordHasher } from './ports/PasswordHasher';

type SignupUserInput = {
  email: string;
  password: string;
};

export class SignupUserUsecase implements UseCase<SignupUserInput> {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
    @Inject('PasswordHasher')
    private passwordHasher: PasswordHasher,
  ) {}

  async execute({ email, password }: SignupUserInput): Promise<void> {
    // Check if user already exists
    const user = await this.userRepository.findByEmail(email);
    if (user) throw new Error('User already exists');

    // Hash password and create user
    const hashedPassword = await this.passwordHasher.hash(password);
    console.log(hashedPassword);
    return Promise.resolve();
  }
}
