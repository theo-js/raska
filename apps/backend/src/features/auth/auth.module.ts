import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { AuthController } from './infrastructure/http/auth.controller';
import { UserPrismaRepository } from '../user/infrastructure/prisma/user.prisma.repository';
import { BcryptPasswordHasher } from './infrastructure/BcryptPasswordHasher';
import { SignupUserUsecase } from './application/signup-user.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'PasswordHasher',
      useClass: BcryptPasswordHasher,
    },
    SignupUserUsecase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
