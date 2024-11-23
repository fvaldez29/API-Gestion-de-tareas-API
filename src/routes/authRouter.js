import express from 'express'
import { userLoginController, userRegisterController } from '../controller/authController.js'

const authRoute = express.Router()

// ? REGISTER USER || POST
authRoute.post('/register', userRegisterController)

// ? LOGIN USER || GET
authRoute.get('/login', userLoginController)


export default authRoute