import { useState, useEffect } from "react";
import { StatusIndicator } from "./StatusIndicator";
import { VoiceButton } from "./VoiceButton";
import { AriLogo } from "./AriLogo";
import { type Language, getTranslations } from "@/lib/i18n";
import ariBackground from "@/assets/ari-background.jpg";
import ariAvatar from "@/assets/ari-avatar.png";

type ConversationState = "ari-speaking" | "user-listening" | "user-speaking" | "reflecting" | "idle";

interface ConversationViewProps {
  language: Language;
}

export function ConversationView({ language }: ConversationViewProps) {
  const [state, setState] = useState<ConversationState>("idle");
  const [currentText, setCurrentText] = useState("");
  
  const t = getTranslations(language);

  // ARI's opening prompt
  useEffect(() => {
    const timer = setTimeout(() => {
      setState("ari-speaking");
      setCurrentText(t.openingPrompt);
      
      // Simulate ARI finishing speaking
      const speakDuration = 4000 + Math.random() * 1000;
      setTimeout(() => {
        setState("user-listening");
      }, speakDuration);
    }, 800);

    return () => clearTimeout(timer);
  }, [t]);

  const handleVoiceButtonClick = () => {
    if (state === "user-listening") {
      // Start recording user's voice
      setState("user-speaking");
    } else if (state === "user-speaking") {
      // Stop recording, ARI will reflect and respond
      setState("reflecting");
      
      // Simulate ARI processing and responding
      setTimeout(() => {
        setState("ari-speaking");
        setCurrentText(t.responses[Math.floor(Math.random() * t.responses.length)]);
        
        // After ARI speaks, go back to listening
        const speakDuration = 3000 + Math.random() * 1500;
        setTimeout(() => {
          setState("user-listening");
        }, speakDuration);
      }, 2000 + Math.random() * 1000);
    }
  };

  const getStatusText = () => {
    switch (state) {
      case "ari-speaking":
        return t.ariSpeaking;
      case "user-listening":
        return t.tapToSpeak;
      case "user-speaking":
        return t.speaking;
      case "reflecting":
        return t.reflecting;
      default:
        return "";
    }
  };

  const isVoiceButtonActive = state === "user-speaking";
  const isVoiceButtonDisabled = state === "ari-speaking" || state === "reflecting";

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

      {/* Main conversation area */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        <div className="max-w-ari w-full flex flex-col items-center">
          
          {/* Video call frame - ARI Avatar */}
          <div className="relative mb-8 ari-fade-up">
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-2xl blur-sm" />
            
            {/* Video frame container */}
            <div className="relative ari-glass rounded-2xl p-1 shadow-xl">
              {/* Inner frame with subtle border */}
              <div className="relative rounded-xl overflow-hidden border border-white/20">
                {/* Avatar image */}
                <img 
                  src={ariAvatar} 
                  alt="ARI" 
                  className="w-80 h-auto object-cover"
                />
                
                {/* Live indicator overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <div className={`w-2 h-2 rounded-full ${state === "ari-speaking" ? "bg-green-400 animate-pulse" : "bg-primary"}`} />
                  <span className="text-xs font-medium text-white/90">
                    {state === "ari-speaking" ? "LIVE" : "ARI"}
                  </span>
                </div>
                
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Name tag */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-sm font-medium text-white/90">ARI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current spoken text display */}
          {(state === "ari-speaking" || state === "reflecting") && currentText && (
            <div className="ari-glass rounded-2xl p-6 mb-8 text-center ari-fade-up max-w-ari-narrow">
              <p className="text-ari-body text-foreground/90 leading-relaxed whitespace-pre-line">
                {currentText}
              </p>
            </div>
          )}

          {/* Visual wave/presence indicator when ARI speaks */}
          {state === "ari-speaking" && (
            <div className="mb-8 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary/60 rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 30}px`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: `${0.8 + Math.random() * 0.4}s`,
                  }}
                />
              ))}
            </div>
          )}


          {/* Reflecting indicator */}
          {state === "reflecting" && (
            <div className="mt-8">
              <StatusIndicator status="reflecting" language={language} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
