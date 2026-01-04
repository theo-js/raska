import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private _prisma: PrismaClient;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    this._prisma = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this._prisma.$connect();
  }

  async onModuleDestroy() {
    await this._prisma.$disconnect();
  }

  public get prisma(): PrismaClient {
    return this._prisma;
  }
}
