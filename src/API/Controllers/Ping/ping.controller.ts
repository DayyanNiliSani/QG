import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/ping/')
@ApiBearerAuth()
export class PingController {
  constructor() {}

  @Get('')
  get() {
    return {
      ping: 'pong',
    };
  }
}
