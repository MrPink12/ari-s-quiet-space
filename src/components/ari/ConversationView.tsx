import { useState, useRef, useEffect } from "react";
import { Message } from "./Message";
import { StatusIndicator } from "./StatusIndicator";
import { Textarea } from "@/components/ui/textarea";
import { AriLogo } from "./AriLogo";
import { ArrowUp } from "lucide-react";
import { type Language, getTranslations } from "@/lib/i18n";
import ariBackground from "@/assets/ari-background.jpg";

interface ChatMessage {
  id: string;
  content: string;
  sender: "ari" | "user";
  isNew?: boolean;
}

interface ConversationViewProps {
  userName: string;
  language: Language;
}

export function ConversationView({ userName, language }: ConversationViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"listening" | "reflecting" | "idle">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const t = getTranslations(language);

  // Initial greeting from ARI
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("reflecting");
      
      setTimeout(() => {
        setMessages([
          {
            id: "welcome",
            content: t.welcome(userName),
            sender: "ari",
            isNew: true,
          },
        ]);
        setStatus("listening");
        
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) => ({ ...msg, isNew: false }))
          );
        }, 500);
      }, 1800);
    }, 600);

    return () => clearTimeout(timer);
  }, [userName, t]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim() || status === "reflecting") return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      isNew: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setStatus("reflecting");

    // Simulate ARI response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: t.responses[Math.floor(Math.random() * t.responses.length)],
        sender: "ari",
        isNew: true,
      };

      setMessages((prev) => [
        ...prev.map((msg) => ({ ...msg, isNew: false })),
        response,
      ]);
      setStatus("listening");

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => ({ ...msg, isNew: false }))
        );
      }, 500);
    }, 2000 + Math.random() * 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = inputValue.trim() && status !== "reflecting";

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${ariBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header */}
      <header className="flex-shrink-0 ari-glass border-b border-white/20">
        <div className="max-w-ari mx-auto px-8 py-4 flex items-center justify-between">
          <AriLogo size="sm" variant="dark" language={language} />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary ari-presence" />
            <span className="text-ari-small text-muted-foreground">
              {t.connected}
            </span>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-ari mx-auto px-8 py-10">
          {/* Glass container for messages */}
          <div className="ari-glass rounded-2xl p-6 min-h-[300px]">
            <div className="space-y-1">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  content={message.content}
                  sender={message.sender}
                  isNew={message.isNew}
                  language={language}
                />
              ))}
            </div>
            
            {/* Status indicator */}
            {status === "reflecting" && (
              <StatusIndicator status={status} language={language} />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input area */}
      <footer className="flex-shrink-0 ari-glass border-t border-white/20">
        <div className="max-w-ari mx-auto px-8 py-5">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.sendPlaceholder}
              disabled={status === "reflecting"}
              rows={1}
              className="min-h-[56px] max-h-[160px] py-4 px-5 pr-14 text-ari-input bg-white/60 border-white/40 rounded-xl shadow-ari-subtle resize-none transition-all duration-ari-medium ease-ari focus:shadow-ari-focus focus:border-primary/30 focus:bg-white/80 placeholder:text-muted-foreground/40 disabled:opacity-40"
            />
            
            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!canSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-ari-medium ease-ari hover:bg-primary/90 disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
          
          {/* Subtle guidance */}
          <p className="mt-3 text-center text-xs text-muted-foreground/50">
            {t.sendHint}
          </p>
        </div>
      </footer>
    </div>
  );
}
