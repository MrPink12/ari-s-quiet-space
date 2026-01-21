import { ConversationView } from "@/components/ari/ConversationView";
import { useLocation, useNavigate } from "react-router-dom";
import { type Language } from "@/lib/i18n";

const TextText = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = (location.state?.language as Language) || "sv";

  const handleBack = () => {
    navigate("/");
  };

  return <ConversationView language={language} onBack={handleBack} mode="text-text" />;
};

export default TextText;
