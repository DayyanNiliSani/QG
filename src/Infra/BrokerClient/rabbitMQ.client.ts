import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib/callback_api';
import * as util from 'util';
import * as config from 'config';

@Injectable()
export class RabbitMQClient {
  private channel: amqp.Channel;
  private exec;
  constructor() {
    const rabbitMQConfig = config.get('rabbitMQ') as {
      host: string;
    };
    amqp.connect(rabbitMQConfig.host, (err, connection) => {
      connection.createChannel((err, channel) => {
        this.channel = channel;
      });
    });
    this.exec = util.promisify(require('child_process').exec);
  }

  public sendEventForUser(userId: number, msg: unknown) {
    this.channel.assertQueue(userId.toString(), {
      durable: false,
    });

    this.channel.sendToQueue(
      userId.toString(),
      Buffer.from(JSON.stringify(msg)),
    );
  }

  public async createUserForBroker(
    userId: number,
    username: string,
    password: string,
  ) {
    await this.exec(`rabbitmqctl add_user '${username}' '${password}'`);
    await this.exec(
      `rabbitmqctl set_permissions -p "/" '${username}' "" "" "${userId}"`,
    );
  }
}
