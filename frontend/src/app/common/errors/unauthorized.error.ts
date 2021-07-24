export class UnauthorizedError extends Error {
  constructor(public message = 'There is no such user') {
    super(message);
  }
}
