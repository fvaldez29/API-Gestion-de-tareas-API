import { Task } from "../models/taskModel.js"


export class TaskController {
    static async createTask(req, res) {
        try {
            const { title, description } = req.body

            const newTask = new Task({
                title,
                description,
                userId: req.user._id // Asocia la tarea al usuario automanticamente
            })

            await newTask.save()
            res.status(201).json({ message: 'New Task created' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: message.error })
        }

    }

    static async getTasks(req, res) {
        try {

            const tasks = await Task.find({ userId: req.user._id })
            res.status(200).json(tasks)

        } catch (error) {
            console.log('Error to find taks: ', error)
            res.status(500).json({ message: message.error })
        }
    }
    static async updateTask(req, res) {
        try {
            const { id } = req.params
            const { title, description, completed } = req.body

            const task = await Task.findOneAndUpdate(
                { _id: id, userId: req.user._id },
                { title, description, completed },
                { new: true }
            )

            if (!task) {
                return res.status(404).json({ message: 'Task Not Found' })
            }

            res.status(200).json(task)
        } catch (error) {
            console.log('Error to update the task: ', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }

    }
    static async deleteTask(req, res) {
        try {
            const { id } = req.params

            const task = await Task.findByIdAndDelete({
                _id: id,
                userId: req.user._id
            })

            if (!task) {
                return res.status(404).json({ message: 'Task Not Found' })
            }

            res.status(200).json({ message: 'Task Delete successfully' })
        } catch (error) {
            console.log('Error to delete the task', error)
            res.status(500).json({ error: 'Error in delete the task' })
        }
    }
}