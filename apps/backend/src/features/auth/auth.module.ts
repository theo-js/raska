import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/http/auth.controller';
import { UserPrismaRepository } from '../user/infrastructure/prisma/user.prisma.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
