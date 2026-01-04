import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
