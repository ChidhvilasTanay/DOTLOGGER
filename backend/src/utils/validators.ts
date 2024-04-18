import { Request, Response, NextFunction } from "express"
import { body, ValidationChain, validationResult } from "express-validator"



const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").notEmpty().isLength({min:6}).withMessage('Password must contain atleast 6 characters')
]

const signupValidator = [
    body("name").notEmpty().withMessage('name is required'),
    ...loginValidator,
]

const chatValidator = [
    body("message").notEmpty().withMessage('message field is required')
]

const validate = (validations: ValidationChain[])=>{
    return async (req:Request, res:Response, next:NextFunction) =>{
        for( let validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty()){
                break
            }
        }
        const errors = validationResult(req)
        console.log('testing')
        if(errors.isEmpty()){
            return next()
        }
        return res.status(422).json({errors: errors.array()})
    }
}


export {validate, signupValidator, chatValidator, loginValidator}