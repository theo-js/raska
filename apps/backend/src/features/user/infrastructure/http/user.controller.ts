import { Controller, Get, Param, Patch } from '@nestjs/common';
import { FindAllUsersUseCase } from '../../application/find-all-users.usecase';
import { BanUserUsecase } from '../../application/ban-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private findAllUsersUseCase: FindAllUsersUseCase,
    private banUserUsecase: BanUserUsecase,
  ) {}

  @Get()
  findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Patch(':id/ban')
  banUser(@Param('id') id: string) {
    return this.banUserUsecase.execute({ id });
  }
}
