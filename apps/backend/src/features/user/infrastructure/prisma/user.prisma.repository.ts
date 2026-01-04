import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const models = await this.prisma.prisma.user.findMany();
    return models.map((model) =>
      User.fromPersistence({
        id: model.id,
        email: model.email,
        name: model.name,
        isBanned: model.is_banned,
      }),
    );
  }
}
