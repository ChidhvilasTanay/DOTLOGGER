// import express from 'express'
// const router = express()
import { Router } from 'express'
import userRouter from './user_routes.js'
import chatRouter from './chat_routes.js'

const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use('/chat', chatRouter)


export default appRouter