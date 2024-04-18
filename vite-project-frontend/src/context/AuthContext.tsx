
//CONTEXT API

import {createContext, useContext,  ReactNode, useState, useEffect} from "react"
import { checkAuthUser, logInUser } from "../helpers/ApiCom";



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
    logout: ()=>Promise<void> | null;
}


//declaring context function which keeps track of changes.
const AuthContext = createContext <UserAuth | null>(null) //create a context of type userAuth type or null type(default)

export const AuthProvider = ({children}:{children: ReactNode}) =>{
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(()=>{
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
    const data = await logInUser(email, password) // function written in api-com.
    if(data){ //if the data fetched by the api from the backend is present then set the fetched data as "user" state variable of the type UserAuth.
        setUser({name:data.name, email:data.email})
        setIsLoggedIn(true)
    }
}
const signup = async(name:string, email:string, password:string)=>{

}
const logout = ()=>{
   
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