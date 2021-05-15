import { NextFunction, Request, Response } from 'express'
import { NotAuthorizedError } from '../errors'

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.currentuser) throw new NotAuthorizedError()

  next()
}
