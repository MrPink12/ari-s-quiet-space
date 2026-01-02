import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StartViewProps {
  onStart: (name: string) => void;
}

export function StartView({ onStart }: StartViewProps) {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-12 ari-fade-up">
        {/* ARI presence indicator */}
        <div className="flex justify-center">
          <div className="w-3 h-3 rounded-full bg-primary/60 ari-breathe" />
        </div>

        {/* Welcome text */}
        <div className="text-center space-y-4">
          <h1 className="text-ari-heading font-light text-foreground">
            Hello. I'm ARI.
          </h1>
          <p className="text-ari-body text-muted-foreground leading-relaxed">
            A space for reflection, at your pace.
          </p>
        </div>

        {/* Name input form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label 
              htmlFor="name" 
              className="block text-ari-small text-muted-foreground text-center"
            >
              What would you like me to call you?
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Your name"
              className="h-14 text-center text-ari-body bg-card border-border rounded-ari-lg shadow-ari-soft transition-all duration-ari-medium ease-ari focus:shadow-ari-focus focus:border-primary/30 placeholder:text-muted-foreground/50"
              autoComplete="off"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={!name.trim()}
            className="w-full h-14 text-ari-body font-normal rounded-ari-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-ari-soft transition-all duration-ari-medium ease-ari disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Begin conversation
          </Button>
        </form>

        {/* Subtle footer */}
        <p className="text-center text-sm text-muted-foreground/60">
          Take your time. There's no rush here.
        </p>
      </div>
    </div>
  );
}
