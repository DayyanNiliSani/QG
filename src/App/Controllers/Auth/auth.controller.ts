import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserRequest } from 'src/App/Dto/Requests/loginUser.request';
import { LoginUserResponse } from 'src/App/Dto/Responses/loginUser.response';
import { UserService } from 'src/Service/Services/user.service';

@Controller('/auth/')
@ApiBearerAuth()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(
    @Req() req: Request,
    @Body() body: LoginUserRequest,
  ): Promise<LoginUserResponse> {
    const token = await this.userService.login(body);
    return {
      token,
    };
  }
}
