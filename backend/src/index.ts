import {connectDB} from "./db/connectDB.js"
import app from "./app.js"
import {config} from "dotenv"
config()


const PORT = process.env.PORT || 5000
const start = async() =>{
    try{
        await connectDB()
        console.log('connected to the DB...')
        app.listen(process.env.PORT,()=>{console.log(`server listening on port ${PORT}...` )})
    }
    catch(error){
        console.log(error)
    }
}

start()