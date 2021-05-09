import { ValidationError } from 'express-validator'
import { CustomError } from './CustomError'

export class RequestValidationError extends CustomError {
  public statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('Invalid params error')

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map(({ msg, param }) => ({ message: msg, field: param }))
  }
}
