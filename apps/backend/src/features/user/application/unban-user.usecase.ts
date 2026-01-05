import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/UserRepository';

@Injectable()
export class UnbanUserUsecase {
  constructor(
    @Inject('UserRepository')
    private users: UserRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<void> {
    const user = await this.users.findById(id);
    user.unban();
    await this.users.save(user);
  }
}
