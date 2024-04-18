import { NextFunction, Request, Response } from "express"
import "express-async-errors"
import {config} from "dotenv"
import User from "../models/user.js"
import configOpenAI from "../config/openAIConfig.js"
import { ChatCompletionRequestMessage, OpenAIApi } from "openai"
config()

export const generateResponse = async(req:Request, res:Response, next:NextFunction) => {
    const { message } = req.body
    const userID = await User.findById(res.locals.jwtData.id)

    if(!userID){
        return res.status(400).json({msg:'user not found!'})
    }

    const chats = userID.chats.map(({role, content})=>{
        return ({role, content})
    }) as ChatCompletionRequestMessage[] 

    chats.push({role:"user", content: message})
    userID.chats.push({role:"user", content:message})

    const config = configOpenAI() // getting the config object from config function written in config folder.
    const openai = new OpenAIApi(config)
    const chatResponse = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:chats,
        })

    userID.chats.push(chatResponse.data.choices[0].message)
    await userID.save()
    return res.status(200).json({chats: userID.chats})
}

// export const getChats = async(req: Request, res:Response, next:NextFunction)=>{
//     const userID = await User.findById(res.locals.jwtData.id)

//     if(!userID){
//         return res.status(400).json({msg:'user not found!'})
//     }

//     const chats = userID.chats.map(({role, content})=>{
//         return ({role, content})
//     })


//     console.log(chats)

//     return res.status(200).json({chats:chats})
// }
