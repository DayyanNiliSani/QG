import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  mapModelToDto,
  ReadUserDto,
  UpdateUserDto,
} from 'src/Infra/Repositories/User/user.dto';
import { UserRepo } from 'src/Infra/Repositories/User/user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { RabbitMQClient } from 'src/Infra/BrokerClient/rabbitMQ.client';

const jwtConfig = config.get('jwt') as {
  password: string;
  expiresIn: string;
};

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo, private rabbitMQClient: RabbitMQClient) {}

  async create(dto: CreateUserDto): Promise<ReadUserDto> {
    const salt = await bcrypt.genSalt(10);
    dto.password = await bcrypt.hash(dto.password, salt);
    const user = await this.userRepo.create(dto);
    this.rabbitMQClient.createUserForBroker(user.id, user.email, dto.password);
    return mapModelToDto(user);
  }

  async login(dto: LoginUserDto): Promise<string> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
    }
    const passwordCheck = await bcrypt.compare(dto.password, user.password);
    if (!passwordCheck) {
    }
    const token = await jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
        username: user.username,
      },
      jwtConfig.password,
      {
        expiresIn: jwtConfig.expiresIn,
      },
    );
    return token;
  }

  async update(id: number, dto: UpdateUserDto): Promise<ReadUserDto> {
    return mapModelToDto(await this.userRepo.update(id, dto));
  }

  async find(id: number): Promise<ReadUserDto> {
    const result = await this.userRepo.find(id);
    return mapModelToDto(result);
  }

  async delete(id: number): Promise<void> {
    return await this.userRepo.delete(id);
  }
}
