"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { MessageThread, ThreadMessage } from "@/features/chat/components/MessageThread";
import { Composer } from "@/features/chat/components/Composer";
import { mockUsers, recentChats } from "@/features/dashboard/lib/mock-data";

export default function ChatPage() {
  const { peerId } = useParams();
  
  // Find user by chat ID or fallback to Aarav for demo
  const chat = recentChats.find(c => c.id === peerId) || recentChats[0];
  const user = chat.user;

  const [messages, setMessages] = useState<ThreadMessage[]>([
    {
      id: "m1",
      direction: "in",
      content: "Hey! Can we review the new designs today?",
      time: "10:30 AM",
      dateStr: "Today",
    },
    {
      id: "m2",
      direction: "out",
      content: "Sure, let me check the Figma file and get back to you in 10 mins.",
      time: "10:32 AM",
      status: "read",
    },
    {
      id: "m3",
      direction: "in",
      content: "Awesome, thanks!",
      time: "10:33 AM",
      reactions: [{ emoji: "🔥", count: 1 }],
      replyTo: {
        authorName: "You",
        content: "Sure, let me check the Figma file and get back to you in 10 mins."
      }
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string) => {
    const newMessage: ThreadMessage = {
      id: Date.now().toString(),
      direction: "out",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending"
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate sending -> sent -> read
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: "sent" } : m));
      
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: "read" } : m));
        
        // Simulate reply after 1s
        setTimeout(() => {
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              direction: "in",
              content: "Got it! Looking forward to your feedback.",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }]);
          }, 2000);
        }, 1000);
      }, 800);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-canvas relative z-0">
      <ChatHeader user={user} isTyping={isTyping || chat.isTyping} />
      <MessageThread messages={messages} typingUser={isTyping ? { name: user.name, initials: user.initials } : undefined} />
      <Composer onSend={handleSend} />
    </div>
  );
}
