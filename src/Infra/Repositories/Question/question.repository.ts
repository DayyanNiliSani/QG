import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "src/Domain/Entities/question";
import { Repository } from "typeorm";
import { CreateQuestionDto, UpdateQuestionDto } from "./question.dto";

@Injectable()
export class QuestionRepo{
    constructor(@InjectRepository(Question) private repo:Repository<Question>){}

    async saveChanges(question:Question):Promise<Question>{
        return await this.repo.save(question)
    }

    async find(id:number):Promise<Question>{
        return await this.repo.find({
            relations:{
                author:true,
                category:true
            }
        })[0]
    }

    async create(dto: CreateQuestionDto):Promise<Question>{
        const model = await this.repo.save({
            ...dto,
            author:{
                id:dto.authorId
            },
            category:{
                id:dto.categoryId
            }
        })
        return model
    }

    async update(id:number, dto: UpdateQuestionDto):Promise<Question>{
        const modelChecking = await this.repo.findOne({
            where:{
                id,
                author:{
                    id:dto.authorId
                }
            } 
        })
        if(!modelChecking) throw new NotFoundException()
        const model = await this. repo.save({
            id,
            ...dto,
            author:{
                id:dto.authorId,
            },
            category:{
                id:dto.categoryId
            }
        })
        return model
    }

    async getAll(skip:number, take:number):Promise<Question[]>{
        const models = await this.repo.find({
            relations:{
                category: true,
                author: true
            },
            skip,
            take,
        })
        return models
    }

    async getCategoryQuestions(categoryId: number, skip:number, take:number):Promise<Question[]>{
        const models = await this.repo.find({
            where:{
                category:{
                    id: categoryId
                }
            },
            relations:{
                author: true
            },
            skip,
            take
        })
        return models
    }
    
    async getUserQuestions(authorId:number, skip: number, take:number):Promise<Question[]>{
        return await this.repo.find({
            where:{
                author:{
                    id: authorId
                }
            },
            relations:{
                category:true
            },
            skip,
            take
        })
    }

    async delete(question:Question):Promise<void>{
        await this.repo.delete(question.id)
    } 
}