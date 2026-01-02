import { type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="ari-glass rounded-full p-1 flex gap-1 shadow-ari-soft">
      <button
        onClick={() => onChange("sv")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-ari-medium ease-ari",
          value === "sv"
            ? "bg-white/80 text-foreground shadow-ari-subtle"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        SV
      </button>
      <button
        onClick={() => onChange("en")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-ari-medium ease-ari",
          value === "en"
            ? "bg-white/80 text-foreground shadow-ari-subtle"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
