import { type Language, getTranslations } from "@/lib/i18n";

interface AriLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  variant?: "light" | "dark";
  language?: Language;
}

export function AriLogo({ size = "md", variant = "dark", language = "en" }: AriLogoProps) {
  const sizes = {
    sm: { width: 80, height: 32, tagline: false },
    md: { width: 100, height: 40, tagline: false },
    lg: { width: 140, height: 56, tagline: true },
    hero: { width: 240, height: 96, tagline: true },
  };

  const t = getTranslations(language);
  const s = sizes[size];
  const color = variant === "light" ? "#FFFFFF" : "currentColor";
  const taglineColor = variant === "light" ? "rgba(255,255,255,0.85)" : "currentColor";

  return (
    <div className="flex flex-col items-center">
      {/* ARI Logo - geometric A with dot, followed by RI */}
      <svg
        viewBox="0 0 120 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: s.width, height: s.height }}
      >
        {/* A - Triangle outline */}
        <path
          d="M24 4L44 44H4L24 4Z"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Dot in A */}
        <circle
          cx="24"
          cy="32"
          r="4"
          fill={color}
        />
        {/* R */}
        <path
          d="M54 8H68C74.6274 8 80 13.3726 80 20C80 26.6274 74.6274 32 68 32H54V8Z"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M54 8V44"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M68 32L80 44"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* I */}
        <path
          d="M92 8V44"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M86 8H98"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M86 44H98"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Tagline */}
      {s.tagline && (
        <div 
          className="mt-4 text-center tracking-[0.25em] uppercase"
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
