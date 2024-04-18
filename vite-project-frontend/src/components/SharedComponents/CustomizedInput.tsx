import { TextField } from "@mui/material"
type Props = {
name: string;
type: string;
label: string;
}


const CustomizedInput = (props: Props) => {
    
  return (
    <div>
        <TextField variant="filled"
            InputProps={{ style: {width:"400px", 
            borderRadius: 10, 
            fontSize:20, 
            color:"white",
            backgroundColor:"#36485e",
            margin:"7px"}}} 
            InputLabelProps={{style:{color:'white'}}}
            name={props.name}
            label={props.label}
            type={props.type}
            color="success" >

        </TextField>
    </div>
  )
}

export default CustomizedInput