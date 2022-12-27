import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from "typeorm";
import { Response, Request } from "express";

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class TypeOrmExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = (exception as any).message.message;
        let status = HttpStatus.INTERNAL_SERVER_ERROR;


        switch(exception.constructor){
            case QueryFailedError:
                status = HttpStatus.UNPROCESSABLE_ENTITY
                break
            case EntityNotFoundError:
                status = HttpStatus.NOT_FOUND
                break
            case CannotCreateEntityIdMapError:
                status = HttpStatus.BAD_REQUEST
                break
        }
        
        response.status(status).send({
            status: status,
            message: exception.message
        })
    }
}