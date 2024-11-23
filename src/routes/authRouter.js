import express from 'express'
import { userRegisterController } from '../controller/authController.js'

const authRoute = express.Router()

// ? REGISTER USER || POST
authRoute.post('/register', userRegisterController)


export default authRoute