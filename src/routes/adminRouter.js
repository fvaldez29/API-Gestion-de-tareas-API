import express from 'express'
import { deleteUsersController, showUsersListController } from '../controller/adminController.js'
import authMiddleWare from '../middleware/authMiddleWare.js'
import adminMiddleware from '../middleware/adminMiddleware.js'


const adminRoute = express.Router()

//? GET ALL USERS 
adminRoute.get('/user/list', authMiddleWare, adminMiddleware, showUsersListController)

//? UPDATE USERS
adminRoute.patch('/user/update', authMiddleWare, adminMiddleware)

//? DELETE USERS
adminRoute.delete('/user/delete/:id', authMiddleWare, adminMiddleware, deleteUsersController)


export default adminRoute