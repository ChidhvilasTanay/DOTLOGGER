import { Link } from "react-router-dom"

type Props = {
  to: string;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => Promise<void>;
  variant?: "default" | "primary";
}

const Navlink = ({ to, text, icon, onClick, variant = "default" }: Props) => {
  const base = "flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
  const styles = variant === "primary"
    ? `${base} bg-foreground text-background hover:bg-foreground/90`
    : `${base} text-muted-foreground hover:text-foreground hover:bg-muted`

  return (
    <Link className={styles} to={to} onClick={onClick}>
      {icon}
      {text}
    </Link>
  )
}

export default Navlink
