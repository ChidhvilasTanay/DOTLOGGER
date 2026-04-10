import axios from "axios"

export const setAuthToken = (token: string | null) => {
    if(token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete axios.defaults.headers.common['Authorization']
}

export const logInUser = async(email: string, password: string)=>{
    const res = await axios.post("/user/login", {email, password})
    if(res.status!== 200){
        throw new Error("unable to login")
    }
    const data = await res.data
    return data
}

export const signUpUser = async(name:string, email: string, password: string)=>{
    const res = await axios.post("/user/signup", {name, email, password})
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

export const logoutReq = async()=>{
    const res = await axios.get("/user/logout")
    if(res.status!==200){
        throw new Error('Could not Logout, try again later...')
    }
    const data = await res.data
    return data
}

export const getChatNames = async() =>{
    const res = await axios.get('/chat/all')
    if(res.status!==200){
        throw new Error('Could not fetch chats')
    }
    const data = await res.data
    return data
}

export const updateChatName = async(chatId: string, newName: string) =>{
    const res = await axios.patch('/chat/rename', {chatId, newName})
    if(res.status!==200){
        throw new Error('Could not fetch chats')
    }
    const data = await res.data
    return data
}
 
export const createNewChat = async() =>{
    const res = await axios.post('/chat/all')
    if(res.status!==200){
        throw new Error('Could not fetch chats')
    }
    const data = await res.data
    return data
}

export const delChatReq = async() =>{
    const res = await axios.delete('/chat/all')
    if(res.status!==200){ 
        throw new Error('Chat not deleted')
    }
    const data = await res.data
    return data
}

export const getChatContent = async(chatId: string) =>{
    const res = await axios.get(`/chat/${chatId}`)
    if(res.status!==200){
        throw new Error('Could not fetch chats')
    }
    const data = await res.data
    return data
}

export const generateResponse = async(chatId: string, message:string) =>{
    const res = await axios.post(`/chat/${chatId}`, {message})
    if(res.status!==200){ 
        throw new Error('User not Authorized')
    }
    const data = await res.data
    return data
}




