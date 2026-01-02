interface AriLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function AriLogo({ size = "md", showText = true }: AriLogoProps) {
  const sizes = {
    sm: { icon: 32, dot: 4, text: "text-sm" },
    md: { icon: 44, dot: 6, text: "text-base" },
    lg: { icon: 64, dot: 8, text: "text-lg" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Geometric A with dot */}
      <div className="relative" style={{ width: s.icon, height: s.icon }}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Triangle A shape */}
          <path
            d="M24 6L42 42H6L24 6Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
            className="text-foreground"
          />
          {/* Center dot */}
          <circle
            cx="24"
            cy="32"
            r={s.dot}
            className="text-primary fill-current"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-semibold tracking-wide text-foreground ${s.text}`}>
            ARI
          </span>
          {size === "lg" && (
            <span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
              Adaptive Relationship Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
}
