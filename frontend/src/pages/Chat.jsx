"use client"

import { useState, useRef, useEffect } from "react"
import ChatBubble from "../components/ChatBubble"

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message:
        "Hello! I'm your MindBloom AI companion. I'm here to listen and support you on your mental wellness journey. How are you feeling today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef(null)

  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection()
  }, [])

  const checkBackendConnection = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/health")
      if (response.ok) {
        setIsConnected(true)
        setError("")
      } else {
        setIsConnected(false)
        setError("Backend server is not responding")
      }
    } catch (error) {
      setIsConnected(false)
      setError("Cannot connect to chat server. Please make sure the Python backend is running.")
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessageToAPI = async (message) => {
    try {
      // Prepare conversation history (last 10 messages for context)
      const history = messages.slice(-10).map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.message,
      }))

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          history: history,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get response")
      }

      const data = await response.json()
      return {
        reply: data.reply,
        isCrisis: data.is_crisis || false,
      }
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isTyping || !isConnected) return

    const userMessage = {
      id: Date.now(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)
    setError("")

    try {
      const { reply, isCrisis } = await sendMessageToAPI(inputMessage)

      const aiMessage = {
        id: Date.now() + 1,
        message: reply,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCrisis: isCrisis,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      setError("I'm having trouble connecting right now. Please try again.")

      const errorMessage = {
        id: Date.now() + 1,
        message:
          "I apologize, but I'm experiencing some technical difficulties. Please try sending your message again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 to-blue-50/50">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
          <div className="bg-white rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">MindBloom AI</h1>
                    <p className="text-green-100 text-sm flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          isConnected ? "bg-green-300 animate-pulse" : "bg-red-300"
                        }`}
                      ></span>
                      {isConnected ? "Connected • Ready to help" : "Disconnected"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={checkBackendConnection}
                  className="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
                >
                  Reconnect
                </button>
              </div>
            </div>

            {/* Connection Error Banner */}
            {!isConnected && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      Chat server is offline. Please start the Python backend server.
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      Run: <code className="bg-red-100 px-1 rounded">cd backend && python app.py</code>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">{error}</p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button onClick={() => setError("")} className="text-yellow-400 hover:text-yellow-600">
                      <span className="sr-only">Dismiss</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/30 to-white/50 space-y-4">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message.message}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  isError={message.isError}
                  isCrisis={message.isCrisis}
                />
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-md border border-green-100">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">MindBloom is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      isConnected
                        ? "Share what's on your mind... (Press Enter to send, Shift+Enter for new line)"
                        : "Please start the backend server to chat..."
                    }
                    className="input-field resize-none min-h-[48px] max-h-32 pr-12"
                    disabled={isTyping || !isConnected}
                    rows={1}
                    style={{
                      height: "auto",
                      minHeight: "48px",
                    }}
                    onInput={(e) => {
                      e.target.style.height = "auto"
                      e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px"
                    }}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-gray-400">{inputMessage.length}/500</div>
                </div>
                <button
                  type="submit"
                  disabled={isTyping || !inputMessage.trim() || inputMessage.length > 500 || !isConnected}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 flex-shrink-0"
                >
                  {isTyping ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                MindBloom AI is here to support you. This is not a replacement for professional mental health care.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
