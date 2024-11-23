import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true,
    enum: ['common', 'admin'],
    default: 'common'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  age: {
    type: Number
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)
