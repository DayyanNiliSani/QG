import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginUserRequest } from 'src/API/Dto/Requests/loginUser.request';
import { LoginUserResponse } from 'src/API/Dto/Responses/loginUser.Response';
import { UserService } from 'src/Service/Services/user.service';

@Controller('/auth/')
export class AuthController {
  constructor(private userService:UserService) {}

  @Post('/login')
  async login(@Req() req:Request, @Body() body:LoginUserRequest):Promise<LoginUserResponse>{
    const token =  await this.userService.login(body)
    return {
      token
    }
  }
}
