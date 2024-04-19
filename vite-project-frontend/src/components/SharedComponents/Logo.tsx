import { Link } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import DataUsageIcon from '@mui/icons-material/DataUsage';
const Logo = () => {
  return (
    <div style={{
        display:"flex",
        marginRight:"auto",
        alignItems:"center",
        gap:"15px"
    }}>
        <Link to={"/"}>
            <Box sx={{display:'flex', alignItems:'center'}}>
            <DataUsageIcon></DataUsageIcon>
            <Typography sx={{
            display:{md:"block", sm:"none", xs:"none"},
             mr:"auto",
             pl:'5px',
            fontWeight:"700",
            textShadow: "2px 2px 20px #000" }}>
                <span style={{fontSize:"20px"}}>DOT</span>-LOGGER
            </Typography>
            </Box>
          </Link>{" "}
    </div>
  )
}

export default Logo