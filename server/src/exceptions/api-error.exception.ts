export class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(status = 400, message = '', errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Unauthorized user');
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}
