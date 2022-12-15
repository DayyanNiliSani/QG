import { Controller, Get } from '@nestjs/common';

@Controller('/ping/')
export class PingController {
  constructor() {}

  @Get('')
  get() {
    return {
      ping: 'pong',
    };
  }
}
