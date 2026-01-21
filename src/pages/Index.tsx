import { useState } from "react";
import { StartView } from "@/components/ari/StartView";
import { type Language } from "@/lib/i18n";

const Index = () => {
  const [language, setLanguage] = useState<Language>("sv");

  return (
    <StartView 
      language={language}
      onLanguageChange={setLanguage}
    />
  );
};

export default Index;
