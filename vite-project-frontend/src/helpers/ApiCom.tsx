import axios from "axios"

export const logInUser = async(email: string, password: string)=>{
    const res = await axios.post("/user/login", {email, password})
    if(res.status!== 200){
        throw new Error("unable to login")
    }
    const data = await res.data
    return data
}

export const checkAuthUser = async() =>{
    const res = await axios.get('/user/auth-status')
    if(res.status!==200){
        throw new Error('User not Authorized')
    }
    const data = await res.data
    return data
}

export const sendChatReq = async(message:string) =>{
    const res = await axios.post('/chat/new', {message})
    if(res.status!==200){ 
        throw new Error('User not Authorized')
    }
    const data = await res.data
    return data
}