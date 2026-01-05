import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { FindAllUsersUseCase } from '../../application/find-all-users.usecase';
import { BanUserUsecase } from '../../application/ban-user.usecase';
import { UnbanUserUsecase } from '../../application/unban-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private findAllUsersUseCase: FindAllUsersUseCase,
    private banUserUsecase: BanUserUsecase,
    private unbanUserUsecase: UnbanUserUsecase,
  ) {}

  @Get()
  findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Patch(':id/ban')
  banUser(@Param('id') id: string) {
    return this.banUserUsecase.execute({ id });
  }

  @Delete(':id/ban')
  unbanUser(@Param('id') id: string) {
    return this.unbanUserUsecase.execute({ id });
  }
}
