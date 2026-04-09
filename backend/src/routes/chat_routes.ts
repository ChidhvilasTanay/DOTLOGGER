import {Router} from 'express'
import { verifyToken } from '../utils/token_manager.js'
import { chatValidator } from '../utils/validators.js'
import { validate } from '../utils/validators.js'
import { deleteChats, generateResponse, getChatNames, getChatContent, createNewChat} from '../controlllers/chat_controllers.js'
const chatRouter = Router()


chatRouter.get('/all', verifyToken, getChatNames)
chatRouter.post('/all', verifyToken, createNewChat)
chatRouter.delete('/all', verifyToken, deleteChats )
chatRouter.get('/:chatId', verifyToken, getChatContent)
chatRouter.post('/:chatId', validate(chatValidator), verifyToken, generateResponse )
// chatRouter.patch('/:chatId', verifyToken, updateChatName)

export default chatRouter