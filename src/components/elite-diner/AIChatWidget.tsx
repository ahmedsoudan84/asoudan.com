"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "./Icons";
import { getChatResponse } from "@/lib/elite-diner/smart-logic";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Welcome to Elite Diner! I'm your AI concierge. How can I assist you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = getChatResponse(userMsg);
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-48px)] rounded-3xl border shadow-2xl overflow-hidden"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
          >
            {/* Header */}
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-[#0a0c10]">
                  <Icons.Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-sm tracking-tight" style={{ color: "var(--fg)" }}>AI Assistant</h3>
                  <p className="text-[10px] uppercase tracking-wider opacity-50 font-bold">Always Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-fg-10 transition-colors"
                style={{ color: "var(--fg-40)" }}
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-[400px] overflow-y-auto p-5 space-y-4 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-montserrat leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-[#0a0c10] rounded-tr-none shadow-lg shadow-accent/20"
                        : "bg-tertiary text-fg-70 rounded-tl-none border border-border-subtle"
                    }`}
                    style={{
                      background: msg.role === "user" ? "var(--accent)" : "var(--bg-tertiary)",
                      color: msg.role === "user" ? "#0a0c10" : "var(--fg-70)"
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-tertiary p-4 rounded-2xl rounded-tl-none" style={{ background: "var(--bg-tertiary)" }}>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-2 bg-tertiary rounded-2xl p-2" style={{ background: "var(--bg-tertiary)" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent px-3 py-1 outline-none text-sm font-montserrat"
                  style={{ color: "var(--fg)" }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all enabled:bg-accent enabled:text-[#0a0c10] disabled:opacity-30 disabled:grayscale"
                  style={{ background: input.trim() ? "var(--accent)" : "transparent" }}
                >
                  <Icons.Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl group overflow-hidden"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute inset-0 bg-accent transition-transform duration-500 scale-0 group-hover:scale-100 opacity-10" />
        <Icons.Sparkles className="w-6 h-6 text-accent transition-transform group-hover:rotate-12" />
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-20 pointer-events-none" />
      </motion.button>
    </div>
  );
}
