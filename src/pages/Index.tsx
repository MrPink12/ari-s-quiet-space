import { useState } from "react";
import { StartView } from "@/components/ari/StartView";
import { ConversationView } from "@/components/ari/ConversationView";

const Index = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = (name: string) => {
    setIsTransitioning(true);
    
    // Gentle transition to conversation
    setTimeout(() => {
      setUserName(name);
    }, 400);
  };

  if (userName) {
    return (
      <div className="ari-fade-in">
        <ConversationView userName={userName} />
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
