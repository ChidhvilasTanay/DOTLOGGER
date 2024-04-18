import { Configuration } from "openai"
import {config} from "dotenv"
config()
const configOpenAI = ()=>{
    const config = new Configuration({
        apiKey:process.env.OPEN_AI_SECRET,
        organization:process.env.OPENAI_ORG_ID
    })
    return config;
}

export default configOpenAI