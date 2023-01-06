export class BaseError extends Error {
  constructor(public message: string) {
    super();
  }
}
