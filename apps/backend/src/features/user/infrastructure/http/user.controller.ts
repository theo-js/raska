import { Controller, Get } from '@nestjs/common';
import { FindAllUsersUseCase } from '../../application/find-all-users.usecase';

@Controller('users')
export class UsersController {
  constructor(private findAllUsersUseCase: FindAllUsersUseCase) {}

  @Get()
  findAll() {
    return this.findAllUsersUseCase.execute();
  }
}
