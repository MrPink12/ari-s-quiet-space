import { useState, useRef, useEffect } from "react";
import { Message } from "./Message";
import { StatusIndicator } from "./StatusIndicator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  sender: "ari" | "user";
  isNew?: boolean;
}

interface ConversationViewProps {
  userName: string;
}

export function ConversationView({ userName }: ConversationViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"listening" | "reflecting" | "idle">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initial greeting from ARI
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("reflecting");
      
      setTimeout(() => {
        setMessages([
          {
            id: "welcome",
            content: `Hello, ${userName}. It's good to meet you.\n\nThis is a space where you can share whatever's on your mind. There's no right or wrong thing to say.\n\nWhat would you like to talk about?`,
            sender: "ari",
            isNew: true,
          },
        ]);
        setStatus("listening");
        
        // Remove the "new" flag after animation
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) => ({ ...msg, isNew: false }))
          );
        }, 600);
      }, 2000);
    }, 800);

    return () => clearTimeout(timer);
  }, [userName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
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
      const ariResponses = [
        "Thank you for sharing that with me. It sounds like something that matters to you.",
        "I hear you. Would you like to tell me more about how that makes you feel?",
        "That's a meaningful thought. What comes up for you when you sit with it?",
        "I'm here with you. Take whatever time you need.",
      ];

      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: ariResponses[Math.floor(Math.random() * ariResponses.length)],
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
      }, 600);
    }, 2500 + Math.random() * 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary/60 ari-breathe" />
          <span className="text-ari-small text-muted-foreground font-medium">
            ARI
          </span>
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-6">
            {messages.map((message) => (
              <Message
                key={message.id}
                content={message.content}
                sender={message.sender}
                isNew={message.isNew}
              />
            ))}
            
            {status !== "idle" && status !== "listening" && (
              <div className="self-start">
                <StatusIndicator status={status} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input area */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share what's on your mind…"
                disabled={status === "reflecting"}
                rows={1}
                className="min-h-[52px] max-h-[150px] py-3.5 px-4 text-ari-body bg-card border-border rounded-ari-lg shadow-ari-soft resize-none transition-all duration-ari-medium ease-ari focus:shadow-ari-focus focus:border-primary/30 placeholder:text-muted-foreground/50 disabled:opacity-50"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || status === "reflecting"}
              size="icon"
              className="h-[52px] w-[52px] rounded-ari-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-ari-soft transition-all duration-ari-medium ease-ari disabled:opacity-40"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          
          {/* Listening indicator */}
          {status === "listening" && (
            <div className="flex justify-center mt-3">
              <span className="text-sm text-muted-foreground/60 ari-fade-in">
                Take your time
              </span>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
