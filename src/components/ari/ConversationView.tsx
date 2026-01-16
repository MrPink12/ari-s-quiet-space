import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Mic, Send, Keyboard } from "lucide-react";
import { AriLogo } from "./AriLogo";
import { Message } from "./Message";
import { type Language, getTranslations } from "@/lib/i18n";
import ariBackground from "@/assets/ari-background.jpg";
import ariAvatarVideo from "@/assets/ari-avatar-video.mp4";
import { cn } from "@/lib/utils";
type InputMode = "voice" | "text";

interface ChatMessage {
  id: string;
  content: string;
  sender: "ari" | "user";
  isNew?: boolean;
}

interface ConversationViewProps {
  language: Language;
  onBack?: () => void;
}

export function ConversationView({ language, onBack }: ConversationViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMode, setInputMode] = useState<InputMode>("voice");
  const [textInput, setTextInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isAriTyping, setIsAriTyping] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const t = getTranslations(language);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ARI's opening message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "opening",
          content: t.openingPrompt,
          sender: "ari",
          isNew: true,
        },
      ]);
    }, 800);

    return () => clearTimeout(timer);
  }, [t]);

  // Clear isNew flag after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => ({ ...msg, isNew: false }))
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [messages.length]);

  const addUserMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      isNew: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAriTyping(true);

    // Simulate ARI response
    setTimeout(() => {
      const ariResponse: ChatMessage = {
        id: `ari-${Date.now()}`,
        content: t.responses[Math.floor(Math.random() * t.responses.length)],
        sender: "ari",
        isNew: true,
      };
      setMessages((prev) => [...prev, ariResponse]);
      setIsAriTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSendText = () => {
    const trimmed = textInput.trim();
    if (trimmed) {
      addUserMessage(trimmed);
      setTextInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      // Stop listening and send transcribed text
      setIsListening(false);
      if (transcribedText.trim()) {
        addUserMessage(transcribedText);
      }
      setTranscribedText("");
    } else {
      // Start listening
      setIsListening(true);
      // Simulate voice transcription
      const samplePhrases = language === "sv" 
        ? ["Jag känner mig lite stressad idag...", "Det har varit en tuff vecka.", "Jag behöver prata om något."]
        : ["I'm feeling a bit stressed today...", "It's been a tough week.", "I need to talk about something."];
      
      setTimeout(() => {
        setTranscribedText(samplePhrases[Math.floor(Math.random() * samplePhrases.length)]);
      }, 1000);
    }
  };

  const toggleInputMode = () => {
    setInputMode((prev) => (prev === "voice" ? "text" : "voice"));
    setIsListening(false);
    setTranscribedText("");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

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
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
                aria-label="Tillbaka"
              >
                <ArrowLeft className="w-5 h-5 text-foreground/70" />
              </button>
            )}
            <AriLogo size="sm" variant="dark" language={language} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary ari-presence" />
            <span className="text-ari-small text-muted-foreground">
              {t.connected}
            </span>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-ari-content mx-auto flex flex-col">
          
          {/* ARI Avatar - Video frame */}
          <div className="relative mb-6 ari-fade-up flex justify-center">
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-2xl blur-sm" />
              
              {/* Video frame container */}
              <div className="relative ari-glass rounded-2xl p-1 shadow-xl">
                <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black/20">
                  <video 
                    src={ariAvatarVideo} 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-w-[420px] max-h-[500px] w-auto h-auto"
                  />
                  
                  {/* LIVE indicator */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-white/90 tracking-wider">LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 min-h-[300px] mt-24 ari-glass rounded-2xl p-4 border border-white/20">
            <div className="h-full max-h-[400px] overflow-y-auto pr-2">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground/50 text-ari-small">
                  {language === "sv" ? "Chatt startar snart..." : "Chat starting soon..."}
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      content={message.content}
                      sender={message.sender}
                      isNew={message.isNew}
                      language={language}
                    />
                  ))}
                  
                  {/* ARI typing indicator */}
                  {isAriTyping && (
                    <div className="py-5 ari-fade-up">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-ari-small font-medium tracking-wide text-primary">
                          {t.ariLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Input area */}
      <footer className="flex-shrink-0 ari-glass border-t border-white/20 px-8 py-4">
        <div className="max-w-ari-content mx-auto">
          {/* Voice transcription display */}
          {inputMode === "voice" && isListening && transcribedText && (
            <div className="mb-3 p-3 rounded-lg bg-white/10 border border-white/20">
              <p className="text-ari-small text-muted-foreground mb-1">{t.youLabel}:</p>
              <p className="text-ari-body text-foreground">{transcribedText}</p>
            </div>
          )}
          
          <div className="flex items-end gap-3">
            {/* Mode toggle button */}
            <button
              onClick={toggleInputMode}
              className="p-3 rounded-full hover:bg-white/10 transition-colors duration-300 flex-shrink-0"
              aria-label={inputMode === "voice" ? t.switchToText : t.switchToVoice}
            >
              {inputMode === "voice" ? (
                <Keyboard className="w-5 h-5 text-foreground/70" />
              ) : (
                <Mic className="w-5 h-5 text-foreground/70" />
              )}
            </button>

            {inputMode === "text" ? (
              /* Text input */
              <div className="flex-1 flex items-end gap-3">
                <textarea
                  ref={textareaRef}
                  value={textInput}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder={t.typeMessage}
                  rows={1}
                  className="flex-1 resize-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-ari-body"
                  style={{ maxHeight: "120px" }}
                />
                <button
                  onClick={handleSendText}
                  disabled={!textInput.trim()}
                  className={cn(
                    "p-3 rounded-full transition-all duration-300 flex-shrink-0",
                    textInput.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-white/10 text-muted-foreground/50 cursor-not-allowed"
                  )}
                  aria-label={t.send}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* Voice input */
              <div className="flex-1 flex flex-col items-center gap-3">
                <button
                  onClick={handleVoiceToggle}
                  className={cn(
                    "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                    isListening
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  aria-label={isListening ? t.stopListening : t.startListening}
                >
                  {isListening && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" />
                      <span className="absolute inset-[-8px] rounded-full border-2 border-destructive/20 animate-pulse" />
                    </>
                  )}
                  <Mic className="w-7 h-7 relative z-10" />
                </button>
                <span className="text-ari-small text-muted-foreground">
                  {isListening ? t.listening : t.tapToSpeak}
                </span>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
