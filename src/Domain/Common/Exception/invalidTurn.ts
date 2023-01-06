import { BaseError } from './baseError';

export class InvalidTurnError extends BaseError {
  constructor(public message: string = "it's not the turn of this player") {
    super(message);
  }
}
