import { type Language, getTranslations } from "@/lib/i18n";

interface StatusIndicatorProps {
  status: "listening" | "reflecting" | "idle";
  language?: Language;
}

export function StatusIndicator({ status, language = "en" }: StatusIndicatorProps) {
  const t = getTranslations(language);
  
  if (status === "idle") return null;

  const statusText = {
    listening: t.listening,
    reflecting: t.reflecting,
  };

  return (
    <div className="py-6 ari-fade-in">
      <span className="text-ari-small text-muted-foreground">
        {statusText[status]}
      </span>
    </div>
  );
}
