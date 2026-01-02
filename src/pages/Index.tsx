import { useState } from "react";
import { StartView } from "@/components/ari/StartView";
import { ConversationView } from "@/components/ari/ConversationView";
import { type Language } from "@/lib/i18n";

const Index = () => {
  const [session, setSession] = useState<{ userName: string; language: Language } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = (name: string, language: Language) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setSession({ userName: name, language });
    }, 350);
  };

  if (session) {
    return (
      <div className="ari-fade-in">
        <ConversationView userName={session.userName} language={session.language} />
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-ari-slow ease-ari ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <StartView onStart={handleStart} />
    </div>
  );
};

export default Index;
