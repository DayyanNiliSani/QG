import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CreateQuestionRequest } from 'src/API/Dto/Requests/createQuestion.request';
import { UpdateQuestionRequest } from 'src/API/Dto/Requests/updateQuestion.request';
import { GetQuestionResponse as GetQuestionsResponse } from 'src/API/Dto/Responses/getQuestions.response';
import { UserInfoDto } from 'src/API/Dto/userInfo.dto';
import { UserInfo } from 'src/API/Middlewares/decorators/userInfo.decorator';
import { IsAdmin } from 'src/API/Middlewares/guards/isAdmin.guard';
import { ReadQuestionDto } from 'src/Infra/Repositories/Question/question.dto';
import { QuestionService } from 'src/Service/Services/question.service';

@Controller('/question/')
@ApiBearerAuth()
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get('/')
  async get(@Query('skip') skip: number, @Query('take') take: number):Promise<GetQuestionsResponse> {
    const result = await this.questionService.getAll(skip, take)
    return {
        questions: result
    } 
  }

  @Get('/category/:categoryId')
  async getByCategoryId(@Param('categoryId') categoryId: number,
    @Query('skip') skip: number, @Query('take') take: number):Promise<GetQuestionsResponse>{
        const result = await this.questionService.getCategoryQuestions(categoryId, skip, take)
        return {
            questions: result
        }
    }

  @Get('/user/')
  async getByUserId(@UserInfo() userInfo:UserInfoDto,
    @Query('skip') skip: number, @Query('take') take: number):Promise<GetQuestionsResponse>{
        const result = await this.questionService.getUserQuestions(userInfo.id, skip, take)
        return {
            questions: result
        }
    }

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: CreateQuestionRequest, @UserInfo() userInfo: UserInfoDto ):Promise<ReadQuestionDto>{
    body.authorId = userInfo.id
    return await this.questionService.create(body)
  }

  @Put('/:id')
  async update(@Param('id') id: number ,@Body() body: UpdateQuestionRequest, @UserInfo() userInfo:UserInfoDto):Promise<ReadQuestionDto>{
    body.authorId = userInfo.id
    return await this.questionService.update(id, body)
  }

  @Patch('/confirm/:id')
  @UseGuards(IsAdmin)
  async confirm(@Param('id') id:number):Promise<ReadQuestionDto>{
    return await this.questionService.confirmQuestion(id)
  }

  @Delete("/:id")
  @HttpCode(204)
  async delete(@Param('id') id:number, @UserInfo() userInfo: UserInfoDto):Promise<void>{
    return await this.questionService.delete(id, userInfo.id, userInfo.isAdmin)
  }
}
