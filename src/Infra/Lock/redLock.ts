import { Injectable } from '@nestjs/common';
import * as config from 'config';
import Client from 'ioredis';
import Redlock from 'redlock';

@Injectable()
export class RedLockInstance {
  public instance: Redlock;
  constructor() {
    const redisConfig = config.get('redis') as {
      host: string;
      port: number;
    };
    const redisConnection = new Client({
      ...redisConfig,
    });

    this.instance = new Redlock([redisConnection]);
  }
}
