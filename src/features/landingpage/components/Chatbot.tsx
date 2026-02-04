import { useState, useRef, useEffect } from "react"
import { X, Send, MessageCircle, Loader } from "lucide-react"
import useChatbot from "@hooks/useChatbot"

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const { messages, loading, error, sendMessage } = useChatbot()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (loading || trimmed.length < 10 || trimmed.length > 500) return
    await sendMessage(trimmed)
    setInput("")
  }

  const charCount = input.trim().length
  const isValidLength = charCount >= 10 && charCount <= 500

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Chat Window */}
      <div
        className={`absolute bottom-20 right-0 w-96 h-[500px] lg:h-[600px] 
        bg-white dark:bg-slate-950 rounded-2xl shadow-2xl flex flex-col overflow-hidden
        border border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out origin-bottom-right
        ${isOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <img src="/logo/ava.png" alt="Ava Avatar" className="w-full rounded-full" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">Ava</h3>
              <p className="text-emerald-100 text-xs font-medium">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-emerald-500/30 rounded-lg p-2 transition-all hover:scale-110 active:scale-95"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 scroll-smooth">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-semibold">Welcome to Ava</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Start a conversation below</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex transition-all duration-300 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm 
                    transition-transform duration-200 ease-out animation-in fade-in slide-in-from-bottom-2
                    ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-none font-medium"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 rounded-bl-none"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none flex gap-2 items-center">
                <Loader className="w-4 h-4 text-emerald-600 animate-spin" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">Ava is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-5 py-3 bg-red-50 dark:bg-red-950/30 border-t border-red-200 dark:border-red-900">
            <p className="text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2">
              <span>⚠️</span> {error}
            </p>
          </div>
        )}

        {/* Input Section */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-950 space-y-3">
          <div className="flex gap-2.5 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full 
              px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white 
              placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 transition-all"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !isValidLength}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-full p-3 
              transition-all active:scale-95 flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>

          {/* Character Counter */}
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              {charCount < 10 && charCount > 0 && (
                <span className="text-amber-500">Minimum 10 characters required</span>
              )}
              {/* {charCount > 50 && <span className="text-red-500">Maximum 50 characters allowed</span>} */}
              {charCount === 0 && "Shift + Enter for new line"}
            </span>
            {/* <span
              className={
                charCount > 50
                  ? "text-red-500 font-semibold"
                  : charCount < 10 && charCount > 0
                  ? "text-amber-500"
                  : ""
              }
            >
              {charCount}/50
            </span> */}
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <div className="flex flex-col items-center">
        {/* Label above bubble */}
        {!isOpen && (
          <div
            className="mb-2 px-3 py-1.5 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 
            text-xs font-medium rounded-full shadow-md border border-slate-200 dark:border-slate-700 
            animate-fade-in cursor-pointer select-none transition-all hover:scale-105"
            onClick={() => setIsOpen(true)}
          >
            Need help? Ask Ava.
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Chat"
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center 
          transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden cursor-pointer 
          ${
            isOpen
              ? "bg-slate-700 hover:bg-slate-800 text-white shadow-xl"
              : "bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white hover:shadow-xl"
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <img src="/logo/ava.png" alt="Ava Avatar" className="w-full" />}
        </button>
      </div>
    </div>
  )
}
