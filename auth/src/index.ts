import cookieSession from 'cookie-session'
import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
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
    secure: true,
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

const startDb = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined')
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to mongodb')
  } catch (error) {
    console.error(error)
  }
}

app.listen(3000, () => {
  console.log('Auth server is listening in the port 3000 🚀')
})

startDb()
