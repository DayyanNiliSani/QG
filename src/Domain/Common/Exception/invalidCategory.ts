import { BaseError } from "./baseError";

export class InvalidCategory extends BaseError{
    constructor(public message:string = "select one of the categories that is suggested"){
        super(message)
    }
}