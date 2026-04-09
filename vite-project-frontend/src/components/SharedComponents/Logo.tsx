import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 select-none">
      <div className="w-7 h-7 rounded-full border-2 border-foreground/80 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-foreground/80" />
      </div>
      <span className="hidden md:block font-bold text-sm tracking-widest text-foreground/90 uppercase">
        DOT-LOGGER
      </span>
    </Link>
  )
}

export default Logo
