import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    

}, { Timestamp: true })