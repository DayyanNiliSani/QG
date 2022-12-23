import { HttpException, HttpStatus } from "@nestjs/common";

export class UnauthenticatedError extends HttpException{
    constructor(message:string = "Please Login"){
        super(message, HttpStatus.FORBIDDEN)
    }
}