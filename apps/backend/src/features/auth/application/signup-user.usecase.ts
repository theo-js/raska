import { Inject } from '@nestjs/common';
import { UseCase } from 'src/core/application/UseCase';
import type { UserRepository } from 'src/features/user/domain/UserRepository';

export class SignupUserUsecase implements UseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  execute(): Promise<void> {
    // Check if user already exists
    const user = this.userRepository.findByEmail();
    return Promise.resolve();
  }
}
