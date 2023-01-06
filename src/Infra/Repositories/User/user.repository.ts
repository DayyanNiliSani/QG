import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Domain/Entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserRepo {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const newModel = await this.repo.save(dto);
    return newModel;
  }

  async find(id: number): Promise<User> {
    const result = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    return result;
  }

  async findByEmail(email: string): Promise<User> {
    return this.repo.findOneBy({ email });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const model = await this.repo.save({
      id: id,
      ...dto,
    });
    return model;
  }
}
