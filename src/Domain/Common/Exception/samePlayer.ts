import { BaseError } from "./baseError";

export class SamePlayerError extends BaseError{
    constructor(public message:string = "this player has already joined the game"){
        super(message)
    }
}