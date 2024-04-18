import {Box, Avatar, Typography, Button, IconButton} from "@mui/material"
import { useAuth } from "../context/AuthContext"
import ChatItem from "../components/Chats/ChatItem"
import { IoMdSend } from "react-icons/io"
import { useRef, useState } from "react"
import { sendChatReq } from "../helpers/ApiCom"
const Chat = () => {

  type message = {
    role: "user" | "assistant",
    content: string
  }

  const auth = useAuth()
  const fName = auth?.user?.name.split(" ")[0]
  const sName = auth?.user?.name.split(" ")[1]
  const [chatHistory, setChatHistory] = useState<message[]>([])

const inputRef = useRef<HTMLInputElement | null > (null)

const handleSubmit = async() =>{
    const content = inputRef.current?.value as string
    if(inputRef && inputRef.current ){
      inputRef.current.value=""
    }
    const newMessage:message = {role:'user', content:content}
    setChatHistory((prev)=>{
          return ([...prev, newMessage])
    })
    const chatData = await sendChatReq(content)
    setChatHistory([...chatData.chats])
}

  return (
    <Box sx={{
      display:"flex",
       flex:1,
      width:"100%",
      height:"100%",
       mt:3,
      gap:3 }}>
          <Box sx={{display:{md:"flex",sm:"none", xs:"none"}, flex:0.2, flexDirection:"column"}}>
            <Box sx ={{display:"flex", flexDirection:'column', width:"100%", height:"60vh", bgcolor:"rgb(17, 29, 39)", borderRadius:5, mx:3}}>
                <Avatar sx={{mx:"auto", my:2, bgcolor:'white', color:'black', fontWeight:700}}>
                      {fName?.[0]}{sName?.[0]}
                </Avatar>
                <Typography sx={{mx:"auto", fontFamily:'Ubuntu', my:4, p:3}}>
                      Enter your query in the space below
                </Typography>
                <Button sx={{width:"200px",
                my:'auto',
                color:'white',
                fontWeight:"700", 
                borderRadius: 3, 
                mx:"auto", 
                bgcolor:"#333146",
                ":hover":{
                  bgcolor:"#b84747"
                }}}>
                        CLEAR CONVERSATION
                </Button>
            </Box>
          </Box>
          <Box sx={{display:"flex", flex:{md:0.8, xs:1, sm:1}, flexDirection:"column", px:3}}>
            <Typography sx={{textAlign:'center', fontSize:"40px", color:'white', mb:2, mx:"auto" }}>
                  Model - GPT 3.5 Turbo
            </Typography>
                <Box sx={{ width: "100%", 
                height: "60vh", 
                borderRadius:3, mx:"auto", 
                disply:'flex', 
                flexDirection:'column', 
                overflow:'scroll',
                overflowX:'hidden',
                overflowY:'auto',
                scrollBehavior:'smooth'}}>
                  {chatHistory.map((chat, index)=>{
                        return <ChatItem content={chat.content} role={chat.role} key={index}/>
                  })}
                </Box>
                <Box sx={{display:"flex", width:"100%",mr:"auto", mt:"7px", bgcolor:"#36485e", borderRadius:2}}>
                <input type='text'
                ref={inputRef}
                style={{
                  width:"100%",
                  backgroundColor: "transparent",
                  padding:"10px",
                  border:"none",
                  outline:"none",
                  color:"white",
                  fontSize:"20px"
                }}>
                </input>
                <IconButton onClick={handleSubmit} sx={{ml:"auto", color:'white'}}>
                  <IoMdSend/>
                </IconButton>
                </Box>
          </Box>
    </Box>
  )
}

export default Chat