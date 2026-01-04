import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/UserRepository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly users: UserRepository,
  ) {}

  execute() {
    return this.users.findAll();
  }
}
