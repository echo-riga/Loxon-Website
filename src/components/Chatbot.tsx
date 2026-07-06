'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { sendChatMessage } from '@/lib/api'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'What services do you offer?',
  'Tell me about your projects',
  'How can I contact you?',
  'What are your business hours?',
]

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm the Loxon Philippines assistant. I can help with questions about our services, projects, company, and contact info. How can I help you today?",
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom whenever messages or typing state change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return

      const userMessage: Message = { role: 'user', content: trimmed }
      const newMessages = [...messages, userMessage]
      setMessages(newMessages)
      setInput('')
      setIsTyping(true)

      try {
        const data = await sendChatMessage(
          newMessages.map((m) => ({ role: m.role, content: m.content }))
        )
        const reply: Message = { role: 'assistant', content: data.reply }
        setMessages((prev) => [...prev, reply])
      } catch {
        const errReply: Message = {
          role: 'assistant',
          content:
            "I'm sorry, I'm having trouble responding right now. Please try again, or contact us directly at lpie@loxon.com.ph or +63 (2) 8470-3912 to 15.",
        }
        setMessages((prev) => [...prev, errReply])
      } finally {
        setIsTyping(false)
      }
    },
    [messages, isTyping]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion)
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-8 right-8 z-50 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-sky-600 text-white px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base leading-tight">Loxon Assistant</h3>
                <p className="text-xs text-sky-100">Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-sky-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions (only show before first user message) */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0 bg-gray-50">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="text-xs text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-full transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-60"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="bg-sky-600 hover:bg-sky-700 text-white p-2.5 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
