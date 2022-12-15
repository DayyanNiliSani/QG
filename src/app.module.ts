import { Module } from '@nestjs/common';
import { PingController } from './API/Controllers/ping/ping.controller';
@Module({
  imports: [],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
