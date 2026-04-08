import Groq from "groq-sdk"
import {config} from "dotenv"
config()

const configGroq = () => {
    return new Groq({ apiKey: process.env.GROQ_API_KEY })
}

export default configGroq