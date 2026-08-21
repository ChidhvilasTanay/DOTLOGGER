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
    try{
        const res = await axios.post("/user/signup", {name, email, password})
        const data = await res.data
        return data
    }
    catch(err: any){
        throw new Error(err.response?.data?.msg)
    }
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

export const deleteChat = async(chatId : string) =>{
    const res = await axios.delete('/chat/delete', {data:{chatId}})
    if(res.status!==200){
        throw new Error('Could not delete chats')
    }
    const data = res.data
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

// export const generateResponse = async(chatId: string, message:string) =>{
//     const res = await axios.post(`/chat/${chatId}`, {message})
//     if(res.status!==200){ 
//         throw new Error('User not Authorized')
//     }
//     const data = await res.data
//     return data
// }

export const generateResponse = async(chatId: string, message:string, onChunk: (token: string)=>void) =>{
    // strip trailing slashes so the join never produces a double slash (which 404s)
    const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1").replace(/\/+$/, "")
    const authToken = localStorage.getItem('auth_token')

    const response = await fetch(`${baseURL}/chat/${chatId}`, {
        method:'POST',
        headers: {
            'Content-Type' : 'application/json',
            // match axios: cross-site cookies are unreliable, so send the bearer token too
            ...(authToken ? {Authorization: `Bearer ${authToken}`} : {})
        },
        credentials: 'include',
        body: JSON.stringify({message})
    })

    if(!response.ok || !response.body){
        // never stream an error page into the chat - surface it instead
        const body = await response.text().catch(()=> "")
        let detail = body
        try{ detail = JSON.parse(body).msg || JSON.parse(body).message || body }catch{ /* not json */ }
        if(/^\s*<(!doctype|html)/i.test(detail)) detail = ""
        throw new Error(`Request failed (${response.status})${detail ? `: ${detail}` : ""}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while(true){
        const {done, value}= await reader.read()
        if(done) break
        const token = decoder.decode(value, {stream: true})
        onChunk(token)
    }
}



