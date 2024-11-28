import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import { TaskController } from "../controller/taskController.js";


const taskRoute = Router()

taskRoute.post('/taks', authMiddleWare, TaskController.createTask)
taskRoute.get('/taks', authMiddleWare, TaskController.getTasks)
taskRoute.patch('/tasks/:id', authMiddleWare, TaskController.updateTask)
taskRoute.delete('/tasks/:id', authMiddleWare, TaskController.deleteTask)

export default taskRoute