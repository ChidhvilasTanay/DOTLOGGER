import User from "../models/user.js"
import "express-async-errors"
import { hash, compare } from "bcrypt"
import { Request, Response } from "express"
import {createToken} from "../utils/token_manager.js"
import COOKIE_NAME from "../utils/constants.js"

const getAllUsers = async (req, res) =>{
        const users = await User.find({})
        return res.status(200).json({users})
}

const createUser = async (req, res) => {
        const {name, email, password} = req.body
        const userCheck = await User.findOne({email:email})
        if(userCheck) return res.status(200).json({msg:'user already exists!'})
        const hashedpwd = await hash(password, 10) // we get a promise
        const userInstance = new User({name, email, password: hashedpwd})
        await userInstance.save()
        res.clearCookie(COOKIE_NAME, {
                httpOnly:true,
                domain:'localhost',
                signed:true,
                path:'/'
        })
        const token = createToken(userInstance._id.toString(), userInstance.email , process.env.JWT_EXPIRESIN.toString())

        const expires = new Date()
        expires.setDate(expires.getDate() + 7 )
        res.cookie(COOKIE_NAME, token, {
                path: '/',
                domain: 'localhost',
                expires,
                httpOnly: true,
                signed: true
        })
        return res.status(200).json({msg:'user created', name:userInstance.name, email: userInstance.email, id:userInstance._id.toString()})
}

const loginUser = async(req, res) => {
        const {email, password} = req.body
        const valUser = await User.findOne({email:email})
        if(!valUser){
                return res.status(400).json({msg:'user not found!'})
        }
        const isPwdCrt = await compare(password, valUser.password)
        
        if(!isPwdCrt){
                return res.status(403).json({msg:'incorrect password!'})
        }
        res.clearCookie(COOKIE_NAME, {
                httpOnly:true,
                domain:'localhost',
                signed:true,
                path:'/'
        })
        const token = createToken(valUser._id.toString(), valUser.email , process.env.JWT_EXPIRESIN.toString())

        const expires = new Date()
        expires.setDate(expires.getDate() + 7 )
        res.cookie(COOKIE_NAME, token, {
                path: '/',
                domain: 'localhost',
                expires,
                httpOnly: true,
                signed: true
        })
        return res.status(200).json({msg:'logged in successfully', name:valUser.name, email: valUser.email, id:valUser._id.toString()})
}

//  controller for verifying the user explicitly.
const verifyUser = async(req: Request, res: Response) => {
        const valUser = await User.findById(res.locals.jwtData.id)
        if(!valUser){
                return res.status(400).json({msg:'user not found!'})
        }
        if(valUser._id.toString()  !== res.locals.jwtData.id){
                return res.status(401).send("permissions dont match...")
        }
        return res.status(200).json({msg:'logged in successfully', name:valUser.name, email: valUser.email, id:valUser._id.toString()})
}


export {getAllUsers, createUser, loginUser, verifyUser}