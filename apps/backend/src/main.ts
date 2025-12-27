import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 3000);
  console.info(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
