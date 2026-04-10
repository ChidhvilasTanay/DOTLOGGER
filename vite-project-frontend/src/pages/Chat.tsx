import { useAuth } from "../context/AuthContext"
import ChatItem from "../components/Chats/ChatItem"
import { IoMdSend } from "react-icons/io"
import { useRef, useState, useEffect } from "react"
import { getChatNames, updateChatName, createNewChat, delChatReq, getChatContent, generateResponse } from "../helpers/ApiCom"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"

type Message = {
  role: "user" | "assistant"
  content: string
}
type Chat = {
  name: string
  content: Message[]
}

type tile = {
  _id: string
  name: string
}

const Chat = () => {
  const auth = useAuth()
  const fName = auth?.user?.name.split(" ")[0]
  const sName = auth?.user?.name.split(" ")[1]
  const [chatId, setChatId] = useState<string>("")
  const [chatName, setChatName] = useState<string>("NEW CHAT")
  const [editTileId, setEditTileId] = useState<string | null >(null)
  const [chatHistory, setChatHistory] = useState<Message[]>([])
  const [sidebarContent, setSideBarContent] = useState<tile[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    getChatNames().then((data) => {
      setSideBarContent(data.chats)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    if (!chatId) return
    getChatContent(chatId).then((data) => {
      setChatHistory(data.chatContent)
    }).catch((err) => {
      console.log(err)
    })
  }, [chatId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])


  const handleNewChat =async () => {
    const {id: newChatId, chatName: newChatName} = await createNewChat()
    setChatId(newChatId)
    setChatName(newChatName)
    setChatHistory([])
    setSideBarContent((prev)=>{return [...prev,{_id: newChatId, name: newChatName}]})
  }

  const handleCurrentChat =async (chatId: string, chatName: string) => {
    setChatId(chatId)
    setChatName(chatName)
  }

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string
    if (!content.trim()) return
    if (inputRef.current) inputRef.current.value = ""
    const newMessage: Message = { role: "user", content }
    setChatHistory((prev) => [...prev, newMessage])
    const chatData = await generateResponse(chatId, content)
    setChatHistory([...chatData.chat.content])
  }

  const handleEditTile = async (newName: string) => {
     if(!newName.trim() || !editTileId) return
     await updateChatName(editTileId, newName)
    setSideBarContent((prev)=>{
      return  prev.map((tile)=>{
        return (tile._id===editTileId) ? {...tile, name:newName} : tile
      })
    })
    setEditTileId(null)
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
        <div className="flex flex-col rounded-2xl border border-border bg-card p-3 h-[70vh]">
          {/* Avatar */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background font-bold text-sm mx-auto mt-2 mb-3 shrink-0">
            {fName?.[0]}{sName?.[0]}
          </div>

          {/* New Chat button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="w-full text-xs font-semibold tracking-wide mb-2 shrink-0"
          >
            + New Chat
          </Button>

          <div className="w-full h-px bg-border mb-2 shrink-0" />

          {/* Chat tiles */}
          <div className="flex-1 overflow-y-auto min-h-0 space-y-1 custom-scroll pr-1">
            {sidebarContent.map(({ _id, name }) => (
              editTileId === _id ? (
                <input
                  key={_id}
                  autoFocus
                  defaultValue={name}
                  onBlur={(e) => handleEditTile(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditTile((e.target as HTMLInputElement).value)
                    if (e.key === "Escape") setEditTileId(null)
                  }}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-muted outline-none text-foreground border border-border"
                />
              ) : (
                <button
                  key={_id}
                  onClick={() => handleCurrentChat(_id, name)}
                  onDoubleClick={() => setEditTileId(_id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors truncate
                    ${chatId === _id
                      ? "bg-muted text-foreground font-medium"
                      : "text-foreground/60 hover:bg-muted/60 hover:text-foreground"
                    }`}
                >
                  {name}
                </button>
              )
            ))}
          </div>

          <div className="w-full h-px bg-border mt-2 mb-2 shrink-0" />

          {/* Clear button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClear}
            className="w-full text-xs font-semibold tracking-wide shrink-0"
          >
            Clear All
          </Button>
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <h2 className="text-center text-foreground/70 text-sm font-medium tracking-widest uppercase mb-3 shrink-0">
          {chatName}
        </h2>

        {/* Messages — grows to fill remaining space, scrolls internally */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 space-y-1 custom-scroll">
          {
            chatHistory.map((message, index) => (
            <ChatItem content={message.content} role={message.role} key={index} />
          ))
          }
          <div ref={chatEndRef} />
        </div>

          {/* Input bar */}

        {chatId ? (
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

          ) : (
        <div className="flex items-center justify-center mt-3 shrink-0">
          <Button
            variant="outline"
            onClick={handleNewChat}
            className="px-6 py-2 text-sm font-semibold tracking-wide"
          >
            + New Chat
          </Button>
        </div>
        
         ) }

      </div>
    </div>
  )
}

export default Chat
