import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import authRoute from './src/routes/authRouter.js'
import userRoute from './src/routes/userRouter.js'

import adminRoute from './src/routes/adminRouter.js'

dotenv.config()

const app = express()

// disable x-powered-by
app.disable('x-powered-by')

//connect to database
mongoose.connect(process.env.MONGO_DATABASE_URL)
    .then(() => console.log('database is running'))
    .catch((err) => console.log('Database connection error', err))

//Middleware
app.use(express.json())
app.use(morgan('dev'))



//App routes
app.use('/', authRoute)
app.use('/', userRoute)

// PROTECTED ROUTES
app.use('/admin', adminRoute)



const port = process.env.PORT

app.listen(port, () => {
    console.log(`server listening on por http://localhost:${port}`)
})
