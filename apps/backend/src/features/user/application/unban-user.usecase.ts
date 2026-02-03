import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/UserRepository';
import { UseCase } from 'src/core/application/UseCase';

@Injectable()
export class UnbanUserUsecase implements UseCase {
  constructor(
    @Inject('UserRepository')
    private users: UserRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<void> {
    const user = await this.users.findById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    user.unban();
    await this.users.save(user);
  }
}
