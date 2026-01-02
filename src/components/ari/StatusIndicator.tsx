import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "listening" | "reflecting" | "idle";
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  if (status === "idle") return null;

  const statusText = {
    listening: "ARI is listening…",
    reflecting: "ARI is reflecting…",
  };

  return (
    <div className="flex items-center gap-3 px-5 py-3 ari-fade-in">
      <div className="flex gap-1">
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full bg-primary/50",
            status === "reflecting" && "ari-pulse-soft"
          )}
          style={{ animationDelay: "0ms" }}
        />
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full bg-primary/40",
            status === "reflecting" && "ari-pulse-soft"
          )}
          style={{ animationDelay: "150ms" }}
        />
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full bg-primary/30",
            status === "reflecting" && "ari-pulse-soft"
          )}
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <span className="text-ari-small text-muted-foreground">
        {statusText[status]}
      </span>
    </div>
  );
}
