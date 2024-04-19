import { useAuth } from "../context/AuthContext"
import { Box, Typography } from "@mui/material"
import TypewriterComponent from "typewriter-effect"
const Home = () => {

  const auth = useAuth()
  const fName = auth?.user?.name.split(" ")[0]
  let homestring = 'Hey there! Login to continue...'
  if(fName){
    homestring = `Hey ${fName} ! ....How are you doing?`
  }
  const date = new Date();

const options: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
};

const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <Box sx={{display:'flex', height:'80vh', justifyContent:'center', alignItems:'center'}}>
          <Typography sx={{my:"auto",pl:'15px', fontFamily:'Ubuntu', fontWeight:'400', fontSize:'80px'}}>
                <TypewriterComponent 
                options={{ strings: [homestring, formattedDate],
                autoStart: true,
                loop:true}}>
                </TypewriterComponent>
          </Typography>
    </Box>
  )
}

export default Home