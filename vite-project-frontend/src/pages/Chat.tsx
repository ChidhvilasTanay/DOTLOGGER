import { useAuth } from "../context/AuthContext"
import ChatItem from "../components/Chats/ChatItem"
import { IoMdSend } from "react-icons/io"
import { useRef, useState, useEffect } from "react"
import { delChatReq, getChatsReq, sendChatReq } from "../helpers/ApiCom"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"

type Message = {
  role: "user" | "assistant"
  content: string
}

const Chat = () => {
  const auth = useAuth()
  const fName = auth?.user?.name.split(" ")[0]
  const sName = auth?.user?.name.split(" ")[1]
  const [chatHistory, setChatHistory] = useState<Message[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    getChatsReq().then((data) => {
      setChatHistory(data.chats)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string
    if (!content.trim()) return
    if (inputRef.current) inputRef.current.value = ""
    const newMessage: Message = { role: "user", content }
    setChatHistory((prev) => [...prev, newMessage])
    const chatData = await sendChatReq(content)
    setChatHistory([...chatData.chats])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleClear = async () => {
    try {
      toast.loading("Deleting chats", { id: "deleteChats" })
      await delChatReq()
      setChatHistory([])
      toast.success("Deleted chats successfully", { id: "deleteChats" })
    } catch {
      toast.error("Failed to Delete Chats", { id: "deleteChats" })
    }
  }

  return (
    <div className="flex w-full mt-4 gap-4 px-4 pb-8 h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 h-[70vh]">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background font-bold text-sm mx-auto mt-2">
            {fName?.[0]}{sName?.[0]}
          </div>
          <p className="text-muted-foreground text-sm text-center leading-relaxed px-2">
            Enter your query in the space below
          </p>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClear}
            className="mt-auto w-full text-xs font-semibold tracking-wide"
          >
            Clear Conversation
          </Button>
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <h2 className="text-center text-foreground/70 text-sm font-medium tracking-widest uppercase mb-3 shrink-0">
          BRO
        </h2>

        {/* Messages — grows to fill remaining space, scrolls internally */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 space-y-1 custom-scroll">
          {chatHistory.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 mt-3 shrink-0 bg-muted rounded-xl border border-border px-4 py-2">
          <input
            type="text"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            placeholder="Send a message…"
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
          />
          <button
            onClick={handleSubmit}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <IoMdSend size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
