import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/UserRepository';
import { UseCase } from 'src/core/application/UseCase';

@Injectable()
export class FindAllUsersUseCase implements UseCase {
  constructor(
    @Inject('UserRepository')
    private readonly users: UserRepository,
  ) {}

  execute() {
    return this.users.findAll();
  }
}
