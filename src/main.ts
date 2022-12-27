import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TypeOrmExceptionFilter } from './API/Middlewares/typeOrmError.middleware';
import { CustomErrorExceptionFilter } from './API/Middlewares/customError.middleware';
import { Seeds } from './Infra/Seed';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );


  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  const config = new DocumentBuilder()
    .setTitle('QG')
    .setDescription('A feature rich quiz game')
    .setVersion('1.0')
    .addTag('qg')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalFilters(new TypeOrmExceptionFilter())
  app.useGlobalFilters(new CustomErrorExceptionFilter())

  await app.listen(3000);

  for(var seed of Seeds){
    try{
      await app.get(seed).seed()
    }catch(exp){}
  }
}
bootstrap();
