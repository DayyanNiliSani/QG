import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib/callback_api';
import * as util from 'util';
import * as config from 'config';
import axios from 'axios';

@Injectable()
export class RabbitMQClient {
  private channel: amqp.Channel;
  private rabbitMQConfig: {
    host: string;
    port: number;
    apiPort: number;
    username: string;
    password: string;
  };
  constructor() {
    this.rabbitMQConfig = config.get('rabbitMQ') as {
      host: string;
      port: number;
      apiPort: number;
      username: string;
      password: string;
    };
    amqp.connect(
      `amqp://${this.rabbitMQConfig.username}:${this.rabbitMQConfig.password}@${this.rabbitMQConfig.host}:${this.rabbitMQConfig.port}`,
      (err, connection) => {
        connection.createChannel((err, channel) => {
          this.channel = channel;
        });
      },
    );
  }

  public sendEventForUser(userId: number, msg: unknown) {
    this.channel.assertQueue(userId.toString(), {
      durable: false,
    });

    this.channel.sendToQueue(userId.toString(), Buffer.from(JSON.stringify(msg)));
  }

  public async createUserForBroker(userId: number, username: string, password: string) {
    try {
      await axios.put(
        'http://' + this.rabbitMQConfig.host + this.rabbitMQConfig.apiPort + '/api/users/' + username,
        {
          password,
          tags: '',
        },
        {
          auth: {
            username: this.rabbitMQConfig.username,
            password: this.rabbitMQConfig.password,
          },
        },
      );

      await axios.put(
        'http://' + this.rabbitMQConfig.host + this.rabbitMQConfig.apiPort + '/api/topic-permissions/%2F/' + username,
        {
          read: userId,
          write: userId,
          exchange: userId,
        },
        {
          auth: {
            username: this.rabbitMQConfig.username,
            password: this.rabbitMQConfig.password,
          },
        },
      );
    } catch {}
  }
}
