import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "../../context/AuthContext"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const ChatItem = ({ content, role }: { content: string; role: "user" | "assistant" }) => {
  const auth = useAuth()

  if (role === "assistant") {
    return (
      <div className="flex gap-3 px-4 py-3 rounded-xl my-1 bg-muted/40">
        <Avatar className="h-8 w-8 shrink-0 mt-0.5">
          <AvatarFallback className="bg-secondary text-foreground text-xs font-bold">AI</AvatarFallback>
        </Avatar>
        <div className="text-foreground text-base leading-relaxed prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-semibold mt-3 mb-1">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-semibold mt-2 mb-1">{children}</h3>,
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-0.5">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-0.5">{children}</ol>,
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-")
                return isBlock
                  ? <code className="block bg-muted rounded-md px-3 py-2 text-sm font-mono overflow-x-auto my-2">{children}</code>
                  : <code className="bg-muted rounded px-1 py-0.5 text-sm font-mono">{children}</code>
              },
              pre: ({ children }) => <pre className="bg-muted rounded-md p-3 overflow-x-auto my-2 text-sm">{children}</pre>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-2">{children}</blockquote>,
              hr: () => <hr className="border-muted my-3" />,
              table: ({ children }) => <table className="border-collapse w-full my-2 text-sm">{children}</table>,
              th: ({ children }) => <th className="border border-muted-foreground/30 px-3 py-1.5 bg-muted font-semibold text-left">{children}</th>,
              td: ({ children }) => <td className="border border-muted-foreground/30 px-3 py-1.5">{children}</td>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
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
