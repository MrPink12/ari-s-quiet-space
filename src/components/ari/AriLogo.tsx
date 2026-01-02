import { type Language, getTranslations } from "@/lib/i18n";
import ariLogo from "@/assets/ari-logo.svg";

interface AriLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  variant?: "light" | "dark";
  language?: Language;
}

export function AriLogo({ size = "md", variant = "dark", language = "en" }: AriLogoProps) {
  const sizes = {
    sm: { width: 60, tagline: false },
    md: { width: 80, tagline: false },
    lg: { width: 120, tagline: true },
    hero: { width: 200, tagline: true },
  };

  const t = getTranslations(language);
  const s = sizes[size];
  const taglineColor = variant === "light" ? "rgba(255,255,255,0.85)" : "currentColor";

  return (
    <div className="flex flex-col items-center">
      <img
        src={ariLogo}
        alt="ARI"
        style={{ 
          width: s.width,
          filter: variant === "light" ? "brightness(0) invert(1)" : "none"
        }}
      />

      {/* Tagline */}
      {s.tagline && (
        <div
          className="mt-2 text-center tracking-[0.25em] uppercase"
          style={{ 
            color: taglineColor,
            fontSize: size === "hero" ? "0.75rem" : "0.625rem",
            fontWeight: 400,
            letterSpacing: "0.25em"
          }}
        >
          <div>{t.tagline1}</div>
          <div>{t.tagline2}</div>
        </div>
      )}
    </div>
  );
}
