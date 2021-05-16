import cookieSession from 'cookie-session'
import express from 'express'
import 'express-async-errors'
import { NotFoundError } from './errors'
import { errorHandler } from './middlewares'
import {
  currentUserRouter,
  signInUserRouter,
  signOutUserRouter,
  signUpUserRouter,
} from './routes'

const app = express()
app.set('trust proxy', true)

app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)

app.use(currentUserRouter)
app.use(signInUserRouter)
app.use(signOutUserRouter)
app.use(signUpUserRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
