import { CustomError } from './CustomError'

export class NotFoundError extends CustomError {
  public statusCode = 404

  constructor() {
    super('Route not found')
  }

  serializeErrors = () => {
    return [
      {
        message: 'Not found',
      },
    ]
  }
}
