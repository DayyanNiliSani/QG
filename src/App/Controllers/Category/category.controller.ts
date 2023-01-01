import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategoryRequest } from 'src/App/Dto/Requests/createCategory.request';
import { UpdateCategoryRequest } from 'src/App/Dto/Requests/updateCategory.request';
import { GetAllCategoryResponse } from 'src/App/Dto/Responses/getAllCategory.response';
import { IsAdmin } from 'src/App/Middlewares/guards/isAdmin.guard';
import { ReadCategoryDto } from 'src/Infra/Repositories/Category/category.dto';
import { CategoryService } from 'src/Service/Services/category.service';

@Controller('/category/')
@ApiBearerAuth()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  async getAll():Promise<GetAllCategoryResponse> {
    const result = await this.categoryService.getAll()
    return {
        categories: result
    } 
  }

  @Post('')
  @HttpCode(201)
  @UseGuards(IsAdmin)
  async create(@Body() body: CreateCategoryRequest):Promise<ReadCategoryDto>{
    return this.categoryService.create(body)
  }

  @Put('/:id')
  @UseGuards(IsAdmin)
  async update(@Body() body: UpdateCategoryRequest, @Param("id") id:string):Promise<ReadCategoryDto>{
    return await this.categoryService.update(+id, body)
  }

  @Delete('/:id')
  @HttpCode(204)
  @UseGuards(IsAdmin)
  async delete(@Param("id") id:string):Promise<void>{
    return await this.categoryService.delete(+id)
  }
}
