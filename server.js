import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import authRoute from './src/routes/authRouter.js'

dotenv.config()

const app = express()

//connect to database
mongoose.connect(process.env.MONGO_DATABASE_URL)
    .then(() => console.log('database is running'))
    .catch((err) => console.log('Database connection error', err))

//Middleware
app.use(express.json())
app.use(morgan('dev'))


//App routes
app.use('/', authRoute)


const port = process.env.PORT

app.listen(port, () => {
    console.log(`server listening on por http://localhost:${port}`)
})
