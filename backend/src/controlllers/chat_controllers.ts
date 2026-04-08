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

    const chats = userID.chats.map(({role, content})=>{
        return ({role, content})
    }) as {role: "user" | "assistant", content: string}[]

    chats.push({role:"user", content: message})
    userID.chats.push({role:"user", content:message})

    await userID.save()

    const groq = configGroq()
    const chatResponse = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: chats,
    })

    userID.chats.push(chatResponse.choices[0].message)
    await userID.save()
    return res.status(200).json({chats: userID.chats})
}

export const getChats = async(req: Request, res:Response, next:NextFunction)=>{
    const userID = await User.findById(res.locals.jwtData.id)

    if(!userID){
        return res.status(400).json({msg:'user not found!'})
    }

    const chats = userID.chats.map(({role, content})=>{
        return ({role, content})
    })


    console.log(chats)

    return res.status(200).json({chats:chats})
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