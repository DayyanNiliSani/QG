import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/Domain/Entities/user";
import { Repository } from "typeorm";
import { CreateUserDto, mapModelToDto, ReadUserDto, UpdateUserDto } from "./user.dto";

@Injectable()
export class UserRepo{
    constructor(@InjectRepository(User) private repo:Repository<User>){}

    async create(dto: CreateUserDto):Promise<ReadUserDto>{
        const newModel = await this.repo.save(dto);
        return mapModelToDto(newModel)
    }

    async find(id:number):Promise<ReadUserDto>{
        const result = await this.repo.find({
            where:{
                id:id
            }
        })
        return mapModelToDto(result[0]);
    }

    async findByEmail(email:string):Promise<User>{
        return this.repo.findOneBy({email})
    }

    async delete(id:number):Promise<void>{
        await this.repo.delete(id);
    }

    async update(id:number, dto:UpdateUserDto):Promise<ReadUserDto>{
        const model = await this.repo.save({
            id:id,
            ...dto
        })
        return mapModelToDto(model)
    }
}