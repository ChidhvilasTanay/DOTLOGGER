import {Router} from 'express'
import { getAllUsers, createUser, loginUser, userLogout, verifyUser } from '../controlllers/user_controllers.js'
import {validate, signupValidator, loginValidator} from '../utils/validators.js'
import { verifyToken } from '../utils/token_manager.js'

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.post('/signup', validate(signupValidator), createUser)
userRouter.post('/login', validate(loginValidator), loginUser)
userRouter.get('/logout', verifyToken, userLogout)
userRouter.get("/auth-status", verifyToken, verifyUser)
export default userRouter