import Logo from './SharedComponents/Logo'
import { useAuth } from '../context/AuthContext'
import Navlink from './SharedComponents/Navlink'
import { BsChatSquareText } from 'react-icons/bs'
import { LuLogOut } from 'react-icons/lu'

const Header = () => {
  const auth = useAuth()
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3 max-w-screen-xl mx-auto">
        <Logo />
        <nav className="flex items-center gap-2">
          {auth?.isLoggedIn ? (
            <>
              <Navlink to="/chat" text="CHATS" icon={<BsChatSquareText size={14} />} />
              <Navlink to="/" text="Logout" icon={<LuLogOut size={14} />} onClick={auth.logout} />
            </>
          ) : (
            <>
              <Navlink to="/login" text="Login" />
              <Navlink to="/signup" text="Sign Up" variant="primary" />
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
