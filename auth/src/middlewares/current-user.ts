import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentuser?: UserPayload
    }
  }
}

export const currentuser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload
    req.currentuser = payload
  } catch (err) {}

  return next()
}
