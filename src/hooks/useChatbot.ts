import { useState } from "react"
import api from "@services/api"

/**
 * Chatbot hook for handling assistant chat flow via Laravel API (/assistant)
 */
export default function useChatbot() {
  const [messages, setMessages] = useState([]) // {role, content}
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = async (message) => {
    if (!message.trim()) return
    setLoading(true)
    setError(null)

    // Add user message to chat
    const userMsg = { role: "user", content: message }
    setMessages((prev) => [...prev, userMsg])

    try {
      // Send message to Laravel Assistant endpoint
      const { data } = await api.post("/assistant", { message })

      // Clean reply text (handle extra quotes)
      let reply = data.reply
      if (typeof reply === "string") {
        reply = reply.replace(/^"+|"+$/g, "").trim()
      }

      const assistantMsg = { role: "assistant", content: reply }

      // Append assistant reply
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      console.error("Chatbot error:", err)
      setError(err.response?.data?.message || "Something went wrong with the assistant.")
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
  }
}
