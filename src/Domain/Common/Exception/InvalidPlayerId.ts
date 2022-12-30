import { BaseError } from "./baseError";

export class InvalidPlayerId extends BaseError{
    constructor(public message:string = "you are not part of this game"){
        super(message)
    }
}