import {AppBar} from '@mui/material'
import {Toolbar} from '@mui/material'
import Logo from './SharedComponents/Logo'
import { useAuth } from '../context/AuthContext'
import Navlink from './SharedComponents/Navlink'

const Header = () => {
  const auth = useAuth()
  return (
    <AppBar sx={{bgcolor: "transparent", position:"static", boxShadow:"none"}}>
        <Toolbar sx={{display: "flex" }}>
            <Logo/>
            <div>
                  {auth?.isLoggedIn? (
                    <>
                      <Navlink bg="#333146" to="/chat" text="Open Logs" textColor="white" />
                      <Navlink bg="#333146" to="/" text="Logout" textColor="white" />
                    </>
                  ): (<>
                    <Navlink bg="#333146" to="/login" text="login" textColor="white"/>
                    <Navlink bg="#333146" to="/signup" text="signup" textColor="white"/>
                    </>)}
            </div>
        </Toolbar>
  </AppBar>
  )
}

export default Header