import { Box, Avatar, Typography} from "@mui/material"
import { useAuth } from "../../context/AuthContext"

export const ChatItem = ({content, role}:{content:string, role: "user" | "assistant"}) => {
    const auth = useAuth()
  return role === "assistant" ? (<Box sx={{display:"flex", p:2, bgcolor:'#333146', my:2, gap:2, borderRadius:2}}>
    <Avatar sx={{ml:"0"}}>
            <img src="" alt="" width={"30px"}/>
    </Avatar>
    <Box>
        <Typography sx={{color:"white", fontSize:"20px"}}>
            {content}
        </Typography>
    </Box>
  </Box>
) : (
<Box sx={{display:"flex", p:2, bgcolor:'#333146', my:2, gap:2, borderRadius:2}}>
    <Avatar sx={{ml:"0", bgcolor:"black", color:"white"}}>
            {auth?.user?.name[0]}
    </Avatar>
    <Box>
        <Typography sx={{color:"white", fontSize:"20px"}}>
            {content}
        </Typography>
    </Box>
  </Box>
)
}

export default ChatItem