import express from 'express'
import { showUsersListController } from '../controller/userController.js'
import  authMiddleWare  from '../middleware/authMiddleWare.js'
import adminMiddleware from '../middleware/adminMiddleware.js'


const adminRoute = express.Router()

// GET ALL USERS 
adminRoute.get('/user/list', authMiddleWare, adminMiddleware, showUsersListController)


export default adminRoute