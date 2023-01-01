import {
  createParamDecorator,
  ExecutionContext,
  Request,
} from '@nestjs/common';
import { UnauthenticatedError } from 'src/App/Common/Errors/unauthenticated';
import { UserInfoDto } from 'src/App/Dto/userInfo.dto';

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as Request;
    if (!req.headers['X-user-id']) throw new UnauthenticatedError();
    return {
      id: parseInt(req.headers['X-user-id']),
      isAdmin: Boolean(req.headers['X-user-isAdmin']),
      username: req.headers['X-user-username'],
    } as UserInfoDto;
  },
);
