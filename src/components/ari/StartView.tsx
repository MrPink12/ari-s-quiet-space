import { AriLogo } from "./AriLogo";
import { LanguageSelector } from "./LanguageSelector";
import { VoiceButton } from "./VoiceButton";
import { type Language, getTranslations } from "@/lib/i18n";
import ariBackground from "@/assets/ari-background.jpg";

interface StartViewProps {
  onStart: (language: Language) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function StartView({ onStart, language, onLanguageChange }: StartViewProps) {
  const t = getTranslations(language);

  const handleStart = () => {
    onStart(language);
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
      {/* Language selector in corner */}
      <div className="absolute top-6 right-8 z-20">
        <LanguageSelector value={language} onChange={onLanguageChange} />
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

        {/* Voice button to start */}
        <div className="flex flex-col items-center gap-6">
          <VoiceButton
            isListening={false}
            onClick={handleStart}
            size="lg"
          />
          <p className="text-ari-small text-muted-foreground/70">
            {t.tapToBegin}
          </p>
        </div>

        {/* Privacy note */}
        <p className="mt-16 text-center text-xs text-muted-foreground/50">
          {t.privacyNote}
        </p>
      </div>
    </div>
  );
}
