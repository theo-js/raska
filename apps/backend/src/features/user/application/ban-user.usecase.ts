import { Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/UserRepository';
import { UseCase } from 'src/core/application/UseCase';

export class BanUserUsecase implements UseCase {
  constructor(
    @Inject('UserRepository')
    private readonly users: UserRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<void> {
    const user = await this.users.findById(id);
    user.ban();
    await this.users.save(user);
  }
}
