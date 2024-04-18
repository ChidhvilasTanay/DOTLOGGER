import { useAuth } from "../context/AuthContext"
import { Box, Typography } from "@mui/material"
const Home = () => {

  const auth = useAuth()
  const fName = auth?.user?.name.split(" ")[0]
  return (
    <Box sx={{display:'flex', height:'80vh', justifyContent:'center', alignItems:'center'}}>
          <Typography sx={{my:"auto",pl:'15px', fontFamily:'Ubuntu', fontWeight:'400', fontSize:'80px'}}>
                Hey there, {fName} ! ....How are you doing?
          </Typography>
    </Box>
  )
}

export default Home