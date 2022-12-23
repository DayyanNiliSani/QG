import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controllers } from './API/Controllers';
import { Schemas } from './Infra/Schemas';
import { Repos } from './Infra/Repositories';
import { Services } from './Service/Services';
import * as config from 'config'
import { AuthMiddleware } from './API/Middlewares/auth.middleware';

const dbConfig = config.get("db")

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig as any,
      synchronize: true,
      autoLoadEntities:true,
    },),
    TypeOrmModule.forFeature(Schemas),
  ],
  controllers: Controllers,
  providers: [...Repos, ...Services],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
