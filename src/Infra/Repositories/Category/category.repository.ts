import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from "src/Domain/Entities/category";
import { Repository } from "typeorm";
import { CreateCategoryDto, mapModelToDto, ReadCategoryDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryRepo{
    constructor(@InjectRepository(Category) private repo:Repository<Category>){}

    async create(dto:CreateCategoryDto):Promise<ReadCategoryDto>{
        const model = await this.repo.save(dto)
        return mapModelToDto(model)
    }

    async update(id:number, dto:UpdateCategoryDto):Promise<ReadCategoryDto>{
        const model = await this.repo.save({
            id,
            ...dto
        })
        return mapModelToDto(model)
    }

    async delete(id:number):Promise<void>{
        await this.repo.delete(id)
    }

    async getAll():Promise<ReadCategoryDto[]>{
        const result = await this.repo.find()
        return (await result).map(r => mapModelToDto(r))
    }
}