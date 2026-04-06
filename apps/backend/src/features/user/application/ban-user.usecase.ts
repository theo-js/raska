import { Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/UserRepository';
import { UseCase } from 'src/core/application/UseCase';

type BanUserInput = { id: string };

export class BanUserUsecase implements UseCase<BanUserInput> {
  constructor(
    @Inject('UserRepository')
    private readonly users: UserRepository,
  ) {}

  async execute({ id }: BanUserInput): Promise<void> {
    const user = await this.users.findById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    user.ban();
    await this.users.save(user);
  }
}
