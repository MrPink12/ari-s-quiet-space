import { cn } from "@/lib/utils";
import { type Language, getTranslations } from "@/lib/i18n";

interface MessageProps {
  content: string;
  sender: "ari" | "user";
  isNew?: boolean;
  language?: Language;
}

export function Message({ content, sender, isNew = false, language = "en" }: MessageProps) {
  const isAri = sender === "ari";
  const t = getTranslations(language);

  return (
    <div
      className={cn(
        "py-5 border-b border-border/30 last:border-b-0",
        isNew && "ari-fade-up"
      )}
      style={{
        animationDelay: isNew ? "50ms" : "0ms",
        animationFillMode: "backwards",
      }}
    >
      {/* Sender label */}
      <div className="mb-2 flex items-center gap-2">
        {isAri && (
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        )}
        <span className={cn(
          "text-ari-small font-medium tracking-wide",
          isAri ? "text-primary" : "text-muted-foreground"
        )}>
          {isAri ? t.ariLabel : t.youLabel}
        </span>
      </div>
      
      {/* Message content */}
      <p className={cn(
        "text-ari-body leading-relaxed whitespace-pre-wrap",
        isAri ? "text-ari-message-text" : "text-ari-user-text"
      )}>
        {content}
      </p>
    </div>
  );
}
