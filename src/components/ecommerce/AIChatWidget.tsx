"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EcomIcons } from "./Icons";
import { getChatReply } from "@/lib/ecommerce/smart-logic";
import { getProductBySlug } from "@/lib/ecommerce/products";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  suggestedSlugs?: string[];
};

const STARTERS = [
  "Gift under £150",
  "WFH setup",
  "Something cosy",
  "Travel essentials",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "bot",
      text: "Hi — I'm your AI stylist. Tell me the occasion, a budget, or just a vibe and I'll pick three pieces worth seeing.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = (raw?: string) => {
    const value = (raw ?? input).trim();
    if (!value) return;
    setInput("");
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", text: value },
    ]);
    setTyping(true);

    setTimeout(() => {
      const reply = getChatReply(value);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: reply.text,
          suggestedSlugs: reply.suggestedSlugs,
        },
      ]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[85]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="absolute bottom-[72px] right-0 w-[360px] max-w-[calc(100vw-40px)] rounded-[28px] border shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-card)",
              maxHeight: "min(640px, calc(100vh - 120px))",
            }}
          >
            {/* Header */}
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--fg-05)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "var(--accent)" }}
                >
                  <EcomIcons.Sparkles
                    className="w-4 h-4"
                    style={{ color: "var(--bg-primary)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-montserrat font-bold text-sm"
                    style={{ color: "var(--fg)" }}
                  >
                    AI Stylist
                  </h3>
                  <p
                    className="text-[10px] uppercase tracking-[2px] font-montserrat flex items-center gap-1.5"
                    style={{ color: "var(--fg-50)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#10b981" }}
                    />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full transition-colors hover:bg-fg-10"
                style={{ color: "var(--fg-60)" }}
                aria-label="Close"
              >
                <EcomIcons.X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div
                    className="px-3.5 py-3 rounded-2xl rounded-bl-sm"
                    style={{ background: "var(--bg-tertiary)" }}
                  >
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="pt-2">
                  <p
                    className="text-[10px] uppercase font-montserrat tracking-[2px] mb-2"
                    style={{ color: "var(--fg-40)" }}
                  >
                    Try asking
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STARTERS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="px-3 py-1.5 rounded-full text-[11px] font-montserrat border transition-all hover:border-accent hover:text-accent"
                        style={{
                          borderColor: "var(--border-subtle)",
                          color: "var(--fg-60)",
                          background: "var(--fg-05)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="p-3 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div
                className="flex items-center gap-2 rounded-2xl p-1.5"
                style={{ background: "var(--bg-tertiary)" }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask for a pick…"
                  className="flex-1 bg-transparent px-3 py-2 outline-none font-montserrat text-sm"
                  style={{ color: "var(--fg)" }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                  style={{
                    background: input.trim() ? "var(--accent)" : "transparent",
                    color: input.trim() ? "var(--bg-primary)" : "var(--fg-40)",
                  }}
                  aria-label="Send"
                >
                  <EcomIcons.Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((o) => !o)}
        className="relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
        style={{
          background: "var(--accent)",
          color: "var(--bg-primary)",
        }}
        aria-label="Toggle AI stylist"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <EcomIcons.X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <EcomIcons.Sparkles className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-accent animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[85%] space-y-2">
        <div
          className={`px-3.5 py-2.5 font-montserrat text-sm leading-relaxed rounded-2xl ${
            isUser ? "rounded-br-sm" : "rounded-bl-sm"
          }`}
          style={{
            background: isUser ? "var(--accent)" : "var(--bg-tertiary)",
            color: isUser ? "var(--bg-primary)" : "var(--fg)",
          }}
        >
          {message.text}
        </div>
        {message.suggestedSlugs && message.suggestedSlugs.length > 0 && (
          <div className="space-y-1.5">
            {message.suggestedSlugs.map((slug) => {
              const p = getProductBySlug(slug);
              if (!p) return null;
              return (
                <Link
                  key={slug}
                  href={`/buy/ecommerce/shop/${slug}`}
                  className="flex items-center gap-3 p-2 rounded-xl border transition-all hover:border-accent group"
                  style={{
                    borderColor: "var(--border-subtle)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg overflow-hidden shrink-0"
                    style={{ background: "var(--fg-05)" }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-montserrat font-bold text-[12px] truncate group-hover:text-accent transition-colors"
                      style={{ color: "var(--fg)" }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="font-montserrat text-[10px] truncate"
                      style={{ color: "var(--fg-50)" }}
                    >
                      £{p.price} · {p.category}
                    </p>
                  </div>
                  <EcomIcons.ChevronRight
                    className="w-4 h-4 shrink-0"
                    style={{ color: "var(--fg-40)" }}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
