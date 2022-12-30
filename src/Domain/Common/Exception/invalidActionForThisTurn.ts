import { BaseError } from "./baseError";

export class InvalidActionForThisTurn extends BaseError{
    constructor(public message:string = "you shouldn't be doing this right now"){
        super(message)
    }
}