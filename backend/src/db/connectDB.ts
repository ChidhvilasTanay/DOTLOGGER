import {connect, disconnect} from 'mongoose'
import {config} from 'dotenv'
config()
const connectDB = async() => {
    try{
        await connect(process.env.MONGODB_URL)
    }
    catch(error){
        throw new Error("cannot connect to the DB.")
    }
}

const disconnectDB = async() =>{
    try{
        await disconnect()
    }
    catch(error){
        throw new Error("did not disconnect from the DB.")
    }
}

export {connectDB, disconnectDB}