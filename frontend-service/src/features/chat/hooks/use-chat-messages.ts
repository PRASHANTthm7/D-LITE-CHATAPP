"use client"

import * as React from "react"

export interface Message {
  id: string
  content: string
  isOwn: boolean
  time: string
  status?: "sending" | "sent" | "delivered" | "read" | "failed"
  replyTo?: { id: string; content: string; sender: string }
  reactions?: { emoji: string; count: number; reacted: boolean }[]
  type?: "text" | "audio" | "image"
  edited?: boolean
}

interface UseChatMessagesReturn {
  messages: Message[]
  send: (content: string, replyToId?: string) => void
  addReaction: (messageId: string, emoji: string) => void
  deleteMessage: (id: string) => void
}

const MOCK_MESSAGES: Message[] = [
  { id: "1", content: "Hey! How are you doing?", isOwn: false, time: "10:30 AM", status: "read", reactions: [{ emoji: "👋", count: 1, reacted: false }] },
  { id: "2", content: "I'm doing great, just working on the new chat app design.", isOwn: true, time: "10:32 AM", status: "read" },
  { id: "3", content: "That sounds awesome. Can't wait to see it!", isOwn: false, time: "10:35 AM", status: "read" },
  { id: "4", content: "I'll send you a preview later today.", isOwn: true, time: "10:38 AM", status: "read" },
  { id: "5", content: "Perfect, see you tomorrow!", isOwn: false, time: "10:42 AM", status: "read" },
]

export function useChatMessages(peerId: string): UseChatMessagesReturn {
  const [messages, setMessages] = React.useState<Message[]>(MOCK_MESSAGES)

  const send = React.useCallback((content: string, replyToId?: string) => {
    const id = Date.now().toString()
    const optimistic: Message = {
      id,
      content,
      isOwn: true,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      status: "sending",
      replyTo: replyToId
        ? (() => {
            const r = messages.find((m) => m.id === replyToId)
            return r ? { id: r.id, content: r.content, sender: r.isOwn ? "You" : "Peer" } : undefined
          })()
        : undefined,
    }
    setMessages((prev) => [...prev, optimistic])
    // Simulate server confirm
    setTimeout(() => {
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "delivered" } : m))
    }, 800)
    setTimeout(() => {
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "read" } : m))
    }, 2000)
  }, [messages])

  const addReaction = React.useCallback((messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m
        const existing = (m.reactions ?? []).find((r) => r.emoji === emoji)
        if (existing) {
          return {
            ...m,
            reactions: m.reactions?.map((r) =>
              r.emoji === emoji
                ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
                : r
            ).filter((r) => r.count > 0),
          }
        }
        return { ...m, reactions: [...(m.reactions ?? []), { emoji, count: 1, reacted: true }] }
      })
    )
  }, [])

  const deleteMessage = React.useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }, [])

  return { messages, send, addReaction, deleteMessage }
}
