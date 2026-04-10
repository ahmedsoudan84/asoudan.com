'use client';
import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/restaurant/button';
import { Input } from '@/components/restaurant/input';
import { cn } from '@/lib/restaurant/utils';

interface Message { role: 'user' | 'assistant'; content: string; }

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "Hello! I'm your AI dining assistant. Ask me about our menu, wine pairings, or book a table." }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const responses = ["I'd recommend our Truffle Arancini with Champagne!", "Our Wagyu Wellington pairs beautifully with Bordeaux.", "We have several gluten-free options available."];
      setMessages(prev => [...prev, { role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)] }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Button className={cn("fixed bottom-4 right-4 rounded-full shadow-lg", isOpen ? "size-12" : "size-14")} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </Button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-[500px] bg-background border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><h3 className="font-semibold">AI Assistant</h3></div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn("max-w-[80%] p-3 rounded-lg text-sm", msg.role === 'user' ? "bg-primary text-primary-foreground ml-auto" : "bg-muted")}>{msg.content}</div>
            ))}
            {loading && <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">Thinking...</div>}
            <div ref={scrollRef} />
          </div>
          <div className="p-4 border-t flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask about menu..." disabled={loading} />
            <Button onClick={handleSend} disabled={loading || !input.trim()}><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </>
  );
}