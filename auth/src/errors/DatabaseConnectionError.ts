import { CustomError } from './CustomError'

export class DatabaseConnectionError extends CustomError {
  public reason = 'Error connecting database'
  public statusCode = 500

  constructor() {
    super('Error connecting database')

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors = () => [
    {
      message: this.reason,
    },
  ]
}
