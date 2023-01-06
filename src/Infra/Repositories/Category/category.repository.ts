import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/Domain/Entities/category';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryRepo {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const model = await this.repo.save(dto);
    return model;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const model = await this.repo.save({
      id,
      ...dto,
    });
    return model;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async getAll(): Promise<Category[]> {
    const result = await this.repo.find();
    return result;
  }

  async getRandomCats(): Promise<Category[]> {
    const categories = await this.repo.createQueryBuilder('category').select().orderBy('RANDOM()').take(3).getMany();
    return categories;
  }
}
