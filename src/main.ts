import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmExceptionFilter } from './App/Middlewares/typeOrmError.middleware';
import { CustomErrorExceptionFilter } from './App/Middlewares/customError.middleware';
import { Seeds } from './Infra/Seed';
import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import * as config from 'config';

const appConfig = config.get('api') as {
  port: string;
};

async function bootstrap() {
  const apiApp = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true,
  });

  await apiApp.register(fastifyCsrf);
  await apiApp.register(helmet);

  apiApp.enableVersioning({
    type: VersioningType.URI,
  });

  apiApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('QG')
    .setDescription('A feature rich quiz game')
    .setVersion('1.0')
    .addTag('qg')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(apiApp, config);
  SwaggerModule.setup('swagger', apiApp, document);

  apiApp.useGlobalFilters(new TypeOrmExceptionFilter());
  apiApp.useGlobalFilters(new CustomErrorExceptionFilter());

  await apiApp.listen(appConfig.port, '0.0.0.0');
  Logger.log(`Server is listening on port ${appConfig.port}`);
  for (let seed of Seeds) {
    try {
      await apiApp.get(seed).seed();
    } catch (exp) {}
  }
}
bootstrap();
