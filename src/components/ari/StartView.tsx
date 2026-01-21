import { useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { AriLogo } from "./AriLogo";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type Language, getTranslations } from "@/lib/i18n";
import ariBackground from "@/assets/ari-background.jpg";

interface StartViewProps {
  onStart: (language: Language) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function StartView({ onStart, language, onLanguageChange }: StartViewProps) {
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"text-text" | "text-tal" | "tal-tal">("text-text");
  const t = getTranslations(language);

  const handleStart = () => {
    if (name.trim()) {
      onStart(language);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-8 relative"
      style={{
        backgroundImage: `url(${ariBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top right controls */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-3">
        <LanguageSelector value={language} onChange={onLanguageChange} />
        <Button variant="ghost" size="icon" asChild className="text-foreground/70 hover:text-foreground hover:bg-white/10">
          <Link to="/admin">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-ari-narrow ari-fade-up relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-16">
          <AriLogo size="hero" variant="light" language={language} />
        </div>

        {/* Welcome text */}
        <div className="text-center mb-16">
          <h2 className="text-ari-subheading text-foreground/90 mb-3">
            {t.heading}
          </h2>
          <p className="text-ari-body text-muted-foreground">
            {t.subheading}
          </p>
        </div>

        {/* Name input and mode selection */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <label className="text-ari-body text-foreground/90 font-medium">
            Vad heter du?
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Skriv ditt namn..."
            className="text-center bg-white/10 border-white/30 text-foreground placeholder:text-muted-foreground/50 max-w-xs"
          />
          
          {/* Mode selection radio buttons */}
          <RadioGroup 
            value={mode} 
            onValueChange={(value) => setMode(value as "text-text" | "text-tal" | "tal-tal")}
            className="flex flex-row gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-text" id="text-text" className="border-white/50 text-white" />
              <label htmlFor="text-text" className="text-sm text-foreground/90 cursor-pointer">Text - Text</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-tal" id="text-tal" className="border-white/50 text-white" />
              <label htmlFor="text-tal" className="text-sm text-foreground/90 cursor-pointer">Text - Tal</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tal-tal" id="tal-tal" className="border-white/50 text-white" />
              <label htmlFor="tal-tal" className="text-sm text-foreground/90 cursor-pointer">Tal - Tal</label>
            </div>
          </RadioGroup>

          <Button
            onClick={handleStart}
            disabled={!name.trim()}
            size="lg"
          >
            Starta
          </Button>
        </div>

        {/* Privacy note */}
        <p className="mt-16 text-center text-xs text-muted-foreground/50">
          {t.privacyNote}
        </p>
      </div>
    </div>
  );
}
