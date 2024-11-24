import express from 'express'
import authMiddleWare from '../middleware/authMiddleWare.js'
import { resetPasswordController, showUserController, updateUserController } from '../controller/userController.js'


const userRoute = express.Router()

//? GET USER
userRoute.get('/user', authMiddleWare, showUserController)

// ? UPDATE USER
userRoute.put('/user/update', authMiddleWare, updateUserController)

//? PASSWORD RESET
userRoute.patch('/user/passwordUpdate', authMiddleWare, resetPasswordController)

export default userRoute