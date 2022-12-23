import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UnauthenticatedError } from "src/API/Common/Errors/unauthenticated";

@Injectable()
export class IsLogin implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<Request>()
        if(!req.headers['X-user-id']) throw new UnauthenticatedError()
        return true
    }
}