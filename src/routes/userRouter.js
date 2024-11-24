import express from 'express'
import authMiddleWare from '../middleware/authMiddleWare.js'
import { showUserController, updateUserController } from '../controller/userController.js'


const userRoute = express.Router()

//? GET USER
userRoute.get('/user', authMiddleWare, showUserController)

//? GET ALL USERS

// ? UPDATE USER
userRoute.put('/user/update', authMiddleWare, updateUserController)

export default userRoute