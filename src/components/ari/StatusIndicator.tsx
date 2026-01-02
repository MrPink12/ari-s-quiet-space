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
    <div className="py-6 ari-fade-in">
      <span className="text-ari-small text-muted-foreground">
        {statusText[status]}
      </span>
    </div>
  );
}
