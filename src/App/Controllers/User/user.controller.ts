import { Body, Controller, Delete, Get, HttpCode, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserRequest } from 'src/App/Dto/Requests/createUser.request';
import { UpdateUserRequest } from 'src/App/Dto/Requests/updateUser.request';
import { UserInfoDto } from 'src/App/Dto/userInfo.dto';
import { UserInfo } from 'src/App/Middlewares/decorators/userInfo.decorator';
import { ReadUserDto } from 'src/Infra/Repositories/User/user.dto';
import { UserService } from 'src/Service/Services/user.service';

@Controller('/user/')
@ApiBearerAuth()
export class UserController {
  constructor(private userService:UserService) {}

  @Post('')
  @HttpCode(201)
  async create(@Body() body:CreateUserRequest):Promise<ReadUserDto>{
    return await this.userService.create(body)
  }

  @Get('')
  async get(@UserInfo() userInfo: UserInfoDto):Promise<ReadUserDto> {
    return await this.userService.find(userInfo.id)
  }

  @Delete()
  @HttpCode(204)
  async delete(@UserInfo() userInfo: UserInfoDto):Promise<void>{
    return await this.userService.delete(userInfo.id)
  }

  @Put()
  async update(@UserInfo() userInfo: UserInfoDto, @Body() body: UpdateUserRequest):Promise<ReadUserDto>{
    return await this.userService.update(userInfo.id, body)
  }
}
