"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "./Icons";
import { getMedicalChatResponse } from "@/lib/medical-clinic/smart-logic";

const QUICK_PROMPTS = [
  "How do I book?",
  "What does it cost?",
  "I have chest pain",
  "What services do you offer?",
];

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    {
      role: "bot",
      text: "Welcome to VitalCare! I'm your AI health assistant. I can help you find the right specialist, understand our services, or book an appointment. How can I help?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getMedicalChatResponse(text);
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
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
            className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-48px)] rounded-3xl border shadow-2xl overflow-hidden"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border-card)" }}
          >
            {/* Header */}
            <div
              className="p-5 border-b flex items-center justify-between"
              style={{ borderColor: "var(--border-subtle)", background: "var(--fg-05)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
                >
                  <Icons.Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-sm" style={{ color: "var(--fg)" }}>
                    AI Health Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] uppercase tracking-wider font-bold opacity-50">Always Available</p>
                  </div>
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
            <div ref={scrollRef} className="h-[320px] overflow-y-auto p-5 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-montserrat leading-relaxed ${
                      msg.role === "user" ? "rounded-tr-none" : "rounded-tl-none"
                    }`}
                    style={{
                      background: msg.role === "user" ? "var(--accent)" : "var(--bg-tertiary)",
                      color: msg.role === "user" ? "var(--bg-primary)" : "var(--fg-70)",
                      border: msg.role === "bot" ? "1px solid var(--border-subtle)" : "none",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl rounded-tl-none border" style={{ background: "var(--bg-tertiary)", borderColor: "var(--border-subtle)" }}>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--accent)", opacity: 0.4 }} />
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s]" style={{ background: "var(--accent)", opacity: 0.6 }} />
                      <div className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s]" style={{ background: "var(--accent)" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            {messages.length === 1 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all hover:border-accent hover:text-accent"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--fg-50)", background: "var(--fg-05)" }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div className="px-5 pb-2">
              <p className="text-[9px] opacity-30 font-montserrat leading-relaxed">
                Not a substitute for professional medical advice. In an emergency, call 999.
              </p>
            </div>

            {/* Input */}
            <div className="p-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-2 rounded-2xl p-2" style={{ background: "var(--bg-tertiary)" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent px-3 py-1 outline-none text-sm font-montserrat"
                  style={{ color: "var(--fg)" }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ background: input.trim() ? "var(--accent)" : "transparent", color: "var(--bg-primary)" }}
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
        aria-label="Toggle AI Health Assistant"
      >
        <div className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: "var(--accent)" }} />
        <Icons.Sparkles className="w-6 h-6 transition-transform group-hover:rotate-12" style={{ color: "var(--accent)" }} />
        <div className="absolute inset-0 rounded-full border animate-ping opacity-20 pointer-events-none" style={{ borderColor: "var(--accent)" }} />
      </motion.button>
    </div>
  );
}
