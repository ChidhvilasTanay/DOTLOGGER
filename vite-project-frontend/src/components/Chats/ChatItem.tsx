import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "../../context/AuthContext"

export const ChatItem = ({ content, role }: { content: string; role: "user" | "assistant" }) => {
  const auth = useAuth()

  if (role === "assistant") {
    return (
      <div className="flex gap-3 px-4 py-3 rounded-xl my-1 bg-muted/40">
        <Avatar className="h-8 w-8 shrink-0 mt-0.5">
          <AvatarFallback className="bg-secondary text-foreground text-xs font-bold">AI</AvatarFallback>
        </Avatar>
        <p className="text-foreground text-base leading-relaxed">{content}</p>
      </div>
    )
  }

  return (
    <div className="flex gap-3 px-4 py-3 rounded-xl my-1">
      <Avatar className="h-8 w-8 shrink-0 mt-0.5">
        <AvatarFallback className="bg-foreground text-background text-xs font-bold">
          {auth?.user?.name[0]}
        </AvatarFallback>
      </Avatar>
      <p className="text-foreground text-base leading-relaxed">{content}</p>
    </div>
  )
}

export default ChatItem
