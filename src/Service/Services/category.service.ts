import { Injectable } from "@nestjs/common";
import { CreateCategoryDto, ReadCategoryDto, UpdateCategoryDto } from "src/Infra/Repositories/Category/category.dto";
import { CategoryRepo } from "src/Infra/Repositories/Category/category.repository";

@Injectable()
export class CategoryService{
    constructor(private categoryRepo:CategoryRepo){}

    async create(dto: CreateCategoryDto):Promise<ReadCategoryDto>{
        return await this.categoryRepo.create(dto)
    }

    async update(id:number, dto: UpdateCategoryDto):Promise<ReadCategoryDto>{
        return await this.categoryRepo.update(id, dto)
    }

    async delete(id:number):Promise<void>{
        return await this.categoryRepo.delete(id)
    }

    async getAll():Promise<ReadCategoryDto[]>{
        return await this.categoryRepo.getAll()
    }
}