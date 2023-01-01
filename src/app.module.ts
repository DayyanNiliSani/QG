import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controllers } from './App/Controllers';
import { Schemas } from './Infra/Schemas';
import { Repos } from './Infra/Repositories';
import { Services } from './Service';
import * as config from 'config';
import { AuthMiddleware } from './App/Middlewares/auth.middleware';
import { BullModule } from '@nestjs/bull';
import { Seeds } from './Infra/Seed';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQClient } from './Infra/BrokerClient/rabbitMQ.client';
import { RedLockInstance } from './Infra/Lock/redLock';

const dbConfig = config.get('db');
const redisConfig = config.get('redis');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(dbConfig as any),
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature(Schemas),
    BullModule.forRoot({
      redis: redisConfig,
    }),
    BullModule.registerQueue({
      name: 'games',
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ClientsModule.register([
      {
        name: 'GameNotifier',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notify_games_turn',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: Controllers,
  providers: [
    ...Repos,
    ...Services,
    ...Seeds,
    RabbitMQClient,
    RedLockInstance,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
