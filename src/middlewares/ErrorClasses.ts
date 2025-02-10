import ErrorConstants from './ErrorConstants';

export default abstract class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);

    // Ensure the name property reflects the class name
    this.name = this.constructor.name;

    // Capture the stacktrace. (excluding the constructor)
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = ErrorConstants.NOT_FOUND_EXCEPTION) {
    super(404, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = ErrorConstants.BAD_REQUEST_EXCEPTION) {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = ErrorConstants.UNAUTHORIZED_ACCESS) {
    super(401, message);
  }
}

export class InternalServerError extends AppError {
  constructor(message = ErrorConstants.INTERNAL_SERVER_ERROR) {
    super(500, message);
  }
}
