import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StartViewProps {
  onStart: (name: string) => void;
}

export function StartView({ onStart }: StartViewProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="w-full max-w-ari-narrow ari-fade-up">
        {/* Presence indicator */}
        <div className="flex justify-center mb-16">
          <div className="w-2 h-2 rounded-full bg-primary ari-presence" />
        </div>

        {/* Welcome content */}
        <div className="text-center mb-12">
          <h1 className="text-ari-heading text-foreground mb-4">
            A space for reflection.
          </h1>
          <p className="text-ari-body text-muted-foreground">
            Take your time. There is no rush here.
          </p>
        </div>

        {/* Name input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="block text-ari-small text-muted-foreground"
            >
              What should I call you?
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-12 text-ari-input bg-card border-border rounded-md shadow-ari-subtle transition-all duration-ari-medium ease-ari focus:shadow-ari-focus focus:border-primary/40 placeholder:text-muted-foreground/40"
              autoComplete="off"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={!name.trim()}
            className="w-full h-12 text-ari-input font-normal rounded-md bg-primary hover:bg-primary/90 text-primary-foreground shadow-ari-subtle transition-all duration-ari-medium ease-ari disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Start conversation
          </Button>
        </form>
      </div>
    </div>
  );
}
