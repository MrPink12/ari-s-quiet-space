import { cn } from "@/lib/utils";

interface MessageProps {
  content: string;
  sender: "ari" | "user";
  isNew?: boolean;
}

export function Message({ content, sender, isNew = false }: MessageProps) {
  const isAri = sender === "ari";

  return (
    <div
      className={cn(
        "max-w-[85%] px-5 py-4 rounded-ari-lg",
        isNew && "ari-fade-up",
        isAri
          ? "self-start bg-ari-message text-foreground"
          : "self-end bg-card text-foreground border border-border shadow-ari-soft"
      )}
      style={{
        animationDelay: isNew ? "100ms" : "0ms",
        animationFillMode: "backwards",
      }}
    >
      <p className="text-ari-body leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
