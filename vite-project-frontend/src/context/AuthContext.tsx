
//CONTEXT API

import {createContext, useContext,  ReactNode, useState, useEffect} from "react"
import { checkAuthUser, logInUser, logoutReq, signUpUser, setAuthToken} from "../helpers/ApiCom";



//declaring state types
type User = {
    name: string;
    email:string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login:(email:string, password:string)=> Promise<void>;
    signup:(name:string, email:string, password:string)=> Promise<void>;
    logout: ()=>Promise<void>;
}


//declaring context function which keeps track of changes.
const AuthContext = createContext <UserAuth | null>(null) //create a context of type userAuth type or null type(default)

export const AuthProvider = ({children}:{children: ReactNode}) =>{
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(()=>{
            const storedToken = localStorage.getItem('auth_token')
            if(storedToken) setAuthToken(storedToken)
            const checkStatus = async() =>{
                const data = await checkAuthUser()
                if(data){
                    setUser({email: data.email, name: data.name})
                    setIsLoggedIn(true)
                }
            }
            checkStatus()
    }, [])

const login = async(email:string, password:string)=>{
    const data = await logInUser(email, password)
    if(data){
        setUser({name:data.name, email:data.email})
        setIsLoggedIn(true)
        if(data.token){ localStorage.setItem('auth_token', data.token); setAuthToken(data.token) }
    }
}
const signup = async(name:string, email:string, password:string)=>{
    try{
        const data = await signUpUser(name, email, password)
        if(data){
        setUser({name:data.name, email:data.email})
        setIsLoggedIn(true)
        if(data.token){ localStorage.setItem('auth_token', data.token); setAuthToken(data.token) }
    }
    }
    catch(err:any){
        throw err
    }
    
}
const logout = async()=>{
   await logoutReq()
   setUser(null)
   setIsLoggedIn(false)
   localStorage.removeItem('auth_token')
   setAuthToken(null)
   window.location.reload()
}

const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout
}
return <AuthContext.Provider value={value}>
{children }
</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)