import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  isListening: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  size?: "sm" | "lg";
}

export function VoiceButton({ isListening, isDisabled, onClick, size = "lg" }: VoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "relative rounded-full flex items-center justify-center transition-all duration-ari-medium ease-ari",
        "bg-primary text-primary-foreground shadow-ari-medium",
        "hover:bg-primary/90 hover:shadow-ari-focus",
        "disabled:opacity-30 disabled:cursor-not-allowed",
        size === "lg" ? "w-24 h-24" : "w-16 h-16",
        isListening && "ari-pulse-ring"
      )}
      aria-label={isListening ? "Stop listening" : "Start listening"}
    >
      {/* Pulse rings when listening */}
      {isListening && (
        <>
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          <span className="absolute inset-[-8px] rounded-full border-2 border-primary/20 animate-pulse" />
        </>
      )}
      
      {isListening ? (
        <MicOff className={cn("relative z-10", size === "lg" ? "w-10 h-10" : "w-6 h-6")} />
      ) : (
        <Mic className={cn("relative z-10", size === "lg" ? "w-10 h-10" : "w-6 h-6")} />
      )}
    </button>
  );
}
