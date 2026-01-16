import { AriLogo } from "@/components/ari/AriLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ariBackground from "@/assets/ari-background.jpg";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to home on submit
    navigate("/");
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url(${ariBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <AriLogo size="hero" variant="light" language="sv" />
        
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          <Input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 border-white/30 text-foreground placeholder:text-muted-foreground/50 text-center"
          />
          <Button type="submit" className="w-full" size="lg">
            Logga in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
