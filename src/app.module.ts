import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controllers } from './API/Controllers';
import { Schemas } from './Infra/Schemas';
import { Repos } from './Infra/Repositories';
import { Services } from './Service';
import * as config from 'config'
import { AuthMiddleware } from './API/Middlewares/auth.middleware';
import { BullModule } from '@nestjs/bull';
import { Seeds } from './Infra/Seed';

const dbConfig = config.get("db")
const redisConfig = config.get("redis")

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig as any,
      synchronize: true,
      autoLoadEntities:true,
    },),
    TypeOrmModule.forFeature(Schemas),
    BullModule.forRoot({
      redis:redisConfig
    }),
    BullModule.registerQueue({
      name:"games",
    })
  ],
  controllers: Controllers,
  providers: [...Repos, ...Services,...Seeds],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
