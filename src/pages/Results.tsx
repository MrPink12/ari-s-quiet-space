import { AriLogo } from "@/components/ari/AriLogo";
import { type Language, getTranslations } from "@/lib/i18n";
import ariBackground from "@/assets/ari-background.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ResultsProps {
  language?: Language;
  userName?: string;
}

const Results = ({ language = "sv", userName = "Användare" }: ResultsProps) => {
  const navigate = useNavigate();
  const t = getTranslations(language);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 relative"
      style={{
        backgroundImage: `url(${ariBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Logo */}
      <div className="mb-12">
        <AriLogo size="hero" variant="light" language={language} />
      </div>

      {/* Results Card */}
      <div className="ari-glass border border-white/20 rounded-2xl p-8 max-w-xl w-full text-center">
        
        <div className="text-foreground/90 font-semibold text-center">
          <p>Detta var en liten demo och utifrån de ämnen vi pratade om så tror jag att detta stämmer in på dig.</p>
          <p className="mt-4">Ha en fin dag!</p>
        </div>

        <Button 
          onClick={() => navigate("/")}
          className="mt-8 bg-white/20 hover:bg-white/30 text-foreground border border-white/30"
        >
          Tillbaka till start
        </Button>
      </div>
    </div>
  );
};

export default Results;
