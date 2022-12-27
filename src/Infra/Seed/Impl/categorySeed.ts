import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/Domain/Entities/category";
import { CategoryService } from "src/Service/Services/category.service";
import { Repository } from "typeorm";
import { Seed } from "../seed.abstract";

@Injectable()
export class CategorySeed extends Seed{
    constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>,private categoryService:CategoryService){
        super()
    }

    override async seed(){
        const checkIfAnythingExists = (await this.categoryRepo.count()) != 0
        if(checkIfAnythingExists){
          Logger.warn("couldn't seed the category")
          return  
        } 

        await this.categoryService.create({
            title:'sport'
        })

        await this.categoryService.create({
            title:'music'
        })
        
        await this.categoryService.create({
            title:'culture'
        })

        await this.categoryService.create({
            title:'cinema'
        })

        await this.categoryService.create({
            title:'game'
        })

        Logger.log("Category seed completed")
    }
}