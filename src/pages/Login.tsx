import { AriLogo } from "@/components/ari/AriLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to home on submit
    navigate("/");
  };

  return (
    <div className="min-h-screen ari-background flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-8">
        <AriLogo />
        
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          <Input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 border-white/20 text-foreground placeholder:text-foreground/50 text-center"
          />
          <Button type="submit" className="w-full">
            Logga in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
