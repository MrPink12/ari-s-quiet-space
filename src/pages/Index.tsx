import { useState } from "react";
import { StartView } from "@/components/ari/StartView";
import { ConversationView } from "@/components/ari/ConversationView";
import { type Language } from "@/lib/i18n";

const Index = () => {
  const [language, setLanguage] = useState<Language>("sv");
  const [isStarted, setIsStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = (selectedLanguage: Language) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setLanguage(selectedLanguage);
      setIsStarted(true);
    }, 350);
  };

  if (isStarted) {
    return (
      <div className="ari-fade-in">
        <ConversationView language={language} />
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-ari-slow ease-ari ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <StartView 
        onStart={handleStart} 
        language={language}
        onLanguageChange={setLanguage}
      />
    </div>
  );
};

export default Index;
