import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './config/swagger';
import { exceptionFactory } from './infrastructure/http/validation/exceptionFactory';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  setupSwagger(app);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: 0 }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.info(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
