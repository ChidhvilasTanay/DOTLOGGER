import { NextFunction, Request, Response } from "express"
import "express-async-errors"
import {config} from "dotenv"
import User from "../models/user.js"
import configGroq from "../config/openAIConfig.js"
config()

export const generateResponse = async(req:Request, res:Response, next:NextFunction) => {
    const { message } = req.body
    const userID = await User.findById(res.locals.jwtData.id)

    if(!userID){
        return res.status(400).json({msg:'user not found!'})
    }

    const chat = userID.chats.id(req.params.chatId)

    if(!chat){
        return res.status(400).json({msg:'chat not found!'})
    }

    chat.content.push({role:"user", content:message})

    const chatContent = chat.content.map(({ role, content }) => {
        return ({ role, content });
    }) as {role: "user" | "assistant" | "system", content: string}[];
    
    const groq = configGroq();
    const chatResponse = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: chatContent,
    });
    chat.content.push(chatResponse.choices[0].message);
    await userID.save();

    return res.status(200).json({ chat: userID.chats.id(req.params.chatId)});
}

export const getChatNames = async(req: Request, res:Response, next:NextFunction)=>{
    const userID = await User.findById(res.locals.jwtData.id)

    if(!userID){
        return res.status(400).json({msg:'user not found!'})
    }

    const chats = userID.chats.map(({_id, name})=>{
        return ({_id, name})
    })


    console.log(chats)

    return res.status(200).json({chats:chats})
}

export const updateChatName = async (req: Request, res:Response, next:NextFunction)=>{
    const userID = await User.findById(res.locals.jwtData.id)

    if(!userID){
        return res.status(400).json({msg:'user not found!'})
    }
    
    const chat = userID.chats.id(req.body.chatId)

    if(!chat){
        return res.status(400).json({msg: "chat not found!"})
    }

    chat.name = req.body.newName

    await userID.save();

    return res.status(200).json({msg: "OK"})
}

export const deleteChat = async (req: Request, res:Response, next:NextFunction)=>{
    const userID = await User.findById(res.locals.jwtData.id)

    if(!userID){
        return res.status(400).json({msg:'user not found!'})
    }
    
    const chat = userID.chats.id(req.body.chatId)

    if(!chat){
        return res.status(400).json({msg: "chat not found!"})
    }

    userID.chats.pull({_id: req.body.chatId})
    
    await userID.save();

    return res.status(200).json({msg: "OK"})
}


export const getChatContent = async(req: Request, res:Response, next:NextFunction)=>{
    const userID = await User.findById(res.locals.jwtData.id)

    if(!userID){
        return res.status(400).json({msg:'user not found!'})
    }

    const chat = userID.chats.id(req.params.chatId)

    if(!chat){
        return res.status(400).json({msg:'chat not found!'})
    }

    const chatContent = chat.content.map(({role, content})=>{
        return ({role, content})
    })


    console.log(chatContent)

    return res.status(200).json({chatContent: chatContent})
}

export const createNewChat = async(req: Request, res:Response, next:NextFunction)=>{
    const userID = await User.findById(res.locals.jwtData.id)

    if(!userID){
        return res.status(400).json({msg:'user not found!'})
    }

    userID.chats.push({name: "NEW CHAT", content:[]})

    const newChat = userID.chats.at(-1)

    await userID.save()

    return res.status(200).json({id: newChat._id, chatName:newChat.name})
}

export const deleteChats = async( req:Request, res:Response, next:NextFunction) => {
    const userID = await User.findById(res.locals.jwtData.id)
    if(!userID){
        return res.status(400).json({msg:'could not delete chats... try again later'})
    }

    if(userID._id.toString()  !== res.locals.jwtData.id){
        return res.status(401).send("permissions dont match...")
    }
    //@ts-ignore
    userID.chats = []
    await userID.save()
    return res.status(200).json({msg:'OK'})
}