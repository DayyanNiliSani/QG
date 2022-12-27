import { BaseError } from "./baseError";

export class TooManyGamesError extends BaseError{
    constructor(public message:string = "this player has too many games going on"){
        super(message)
    }
}