import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const models = await this.prisma.user.findMany();
    return models.map((model) =>
      User.fromPersistence({
        id: model.id,
        email: model.email,
        name: model.name,
        isBanned: model.is_banned,
      }),
    );
  }

  async findById(id: string): Promise<User> {
    const model = await this.prisma.user.findUnique({ where: { id } });
    if (!model) throw new Error('User not found');

    return User.fromPersistence({
      id,
      email: model.email,
      name: model.name,
      isBanned: model.is_banned,
    });
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_banned: user.isBanned,
      },
      update: {
        email: user.email,
        name: user.name,
        is_banned: user.isBanned,
      },
    });
  }
}
