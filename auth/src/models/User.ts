import mongoose, { Document, Model, Schema } from 'mongoose'
import { Password } from '../services/Password'

interface IUser {
  email: string
  password: string
}

interface IUserModel extends Model<IUserDoc> {
  build(userData: IUser): IUserDoc
}

interface IUserDoc extends Document, IUser {}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})
 
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

userSchema.statics.build = (userData: IUser) => new User(userData)

export const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema)
