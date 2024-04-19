
import { Box, Typography, Button } from '@mui/material'
import CustomizedInput from '../components/SharedComponents/CustomizedInput'
import { RiLoginBoxLine } from "react-icons/ri";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string//find based on the name
    const password = formData.get("password") as string
    try{
        toast.loading("Signing in...",{id: "login"})
        await auth?.login(email, password)
        navigate("/")
        toast.success("Successfully Signed in...",{id: "login"})
    }
    catch(error){
      console.log(error)
        toast.error("Failed to SignIn!", {id:"login"})
    }
  }
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{md:"flex", sm: "none", xs:"none"}}>

      </Box>
      <Box display={"flex"} 
      flex={{xs: 1, md:0.5}}
      justifyContent={"center"}
      padding={2}
      ml={"auto"}
      mt={16}>
        <form 
        onSubmit={handleSubmit}
        style={{
          margin:'auto',
          padding:'30px',
          boxShadow:"2px 2px 10px #000",
          borderRadius:"10px",
          border: "none",
        }}>
          <Box sx={{display:"flex",
           flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"}}>
              <Typography variant="h4" 
              textAlign="center"
               padding={2} 
               fontWeight={600}>
                login
               </Typography>
               <CustomizedInput type="email" name="email" label="Email"/>
               <CustomizedInput type="password" name="password" label="Password"/>
               <Button type="submit" sx={{px:2,
                 py:1, 
                 mt:2, 
                 width:"400px", 
                 borderRadius:2,
                 bgcolor:"#5aa17f",
                 ":hover":{
                    bgcolor:"white",
                    color:"black"
                 }}}
                 endIcon={<RiLoginBoxLine color='black'/>}>
                  
               </Button>
            </Box>
        </form>

      </Box>
    </Box>
  )
}

export default Login