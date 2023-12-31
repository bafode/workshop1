import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'


import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'



//Routes
import evenementRoutes from './routes/evenements.js'
import seederRoutes from './routes/seeder.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()

connectDB()


const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/evenements', evenementRoutes)
app.use('/api/v1/data', seederRoutes)
app.use('/v1/api/upload', uploadRoutes)

//middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)