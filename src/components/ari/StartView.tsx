import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AriLogo } from "./AriLogo";
import { LanguageSelector } from "./LanguageSelector";
import { type Language, getTranslations } from "@/lib/i18n";
import ariBackground from "@/assets/ari-background.jpg";

interface StartViewProps {
  onStart: (name: string, language: Language) => void;
}

export function StartView({ onStart }: StartViewProps) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>("sv");
  
  const t = getTranslations(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim(), language);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-8 relative"
      style={{
        backgroundImage: `url(${ariBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Language selector in corner */}
      <div className="absolute top-6 right-8 z-20">
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      <div className="w-full max-w-ari-narrow ari-fade-up relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-20">
          <AriLogo size="hero" variant="light" language={language} />
        </div>

        {/* Glass card with form */}
        <div className="ari-glass rounded-2xl p-8 shadow-ari-medium">
          {/* Welcome content */}
          <div className="text-center mb-8">
            <h2 className="text-ari-subheading text-foreground/90 mb-2">
              {t.heading}
            </h2>
            <p className="text-ari-small text-muted-foreground">
              {t.subheading}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label 
                htmlFor="name" 
                className="block text-ari-small text-muted-foreground"
              >
                {t.nameLabel}
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="h-12 text-ari-input bg-white/60 border-white/40 rounded-xl shadow-ari-subtle transition-all duration-ari-medium ease-ari focus:shadow-ari-focus focus:border-primary/30 focus:bg-white/80 placeholder:text-muted-foreground/40"
                autoComplete="off"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={!name.trim()}
              className="w-full h-12 text-ari-input font-medium rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-ari-soft transition-all duration-ari-medium ease-ari disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t.startButton}
            </Button>
          </form>

          {/* Subtle footer */}
          <p className="mt-6 text-center text-xs text-muted-foreground/50">
            {t.privacyNote}
          </p>
        </div>
      </div>
    </div>
  );
}
