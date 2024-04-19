import {Router} from 'express'
import { verifyToken } from '../utils/token_manager.js'
import { chatValidator } from '../utils/validators.js'
import { validate } from '../utils/validators.js'
import { deleteChats, generateResponse } from '../controlllers/chat_controllers.js'
const chatRouter = Router()

chatRouter.post('/new', validate(chatValidator), verifyToken, generateResponse )
chatRouter.delete('/new', verifyToken, deleteChats )
// chatRouter.get('/new', validate(chatValidator), verifyToken, getChats)
export default chatRouter