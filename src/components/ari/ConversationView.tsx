import { useState, useEffect } from "react";
import { StatusIndicator } from "./StatusIndicator";
import { VoiceButton } from "./VoiceButton";
import { AriLogo } from "./AriLogo";
import { type Language, getTranslations } from "@/lib/i18n";
import ariBackground from "@/assets/ari-background.jpg";

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
      <main className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="max-w-ari-narrow w-full flex flex-col items-center">
          
          {/* Current spoken text display */}
          {(state === "ari-speaking" || state === "reflecting") && currentText && (
            <div className="ari-glass rounded-2xl p-8 mb-12 text-center ari-fade-up">
              <p className="text-ari-body text-foreground/90 leading-relaxed whitespace-pre-line">
                {currentText}
              </p>
            </div>
          )}

          {/* Visual wave/presence indicator when ARI speaks */}
          {state === "ari-speaking" && (
            <div className="mb-12 flex items-center gap-1">
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

          {/* Voice button */}
          <VoiceButton
            isListening={isVoiceButtonActive}
            isDisabled={isVoiceButtonDisabled}
            onClick={handleVoiceButtonClick}
            size="lg"
          />

          {/* Status text */}
          <p className="mt-6 text-ari-small text-muted-foreground/70 transition-opacity duration-ari-medium">
            {getStatusText()}
          </p>

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
