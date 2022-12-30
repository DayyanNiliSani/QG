import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "src/Domain/Entities/question";
import { User } from "src/Domain/Entities/user";
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

    async getRandomQuestions(categoryId:number):Promise<Question[]>{

        const rawData = await this.repo.createQueryBuilder('question')
            .innerJoinAndSelect('question.author','author')
            .where('question."categoryId" = :categoryId', {categoryId})
            .orderBy('RANDOM()')
            .limit(3)
            .getRawMany()

        const result = rawData.map(data => {
            const question = new Question()
            const author = new User()

            author.email = data.author_email
            author.id = data.author_id
            author.isAdmin = data.author_isAdmin
            author.username = data.author_username
            
            question.author = author
            question.id = data.question_id
            question.answer1 = data.question_answer1
            question.answer2 = data.question_answer2
            question.answer3 = data.question_answer3
            question.answer4 = data.question_answer4
            question.question = data.question_question
            question.isConfirmed = data.question_isConfirmed

            return question
        })

        return result
    }

    async delete(question:Question):Promise<void>{
        await this.repo.delete(question.id)
    } 
}