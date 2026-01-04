import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/user.controller';
import { UserPrismaRepository } from './infrastructure/prisma/user.prisma.repository';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { FindAllUsersUseCase } from './application/find-all-users.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    FindAllUsersUseCase,
  ],
})
export class UserModule {}
