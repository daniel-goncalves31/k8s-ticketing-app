import mongoose from 'mongoose'
import { app } from './app'

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
