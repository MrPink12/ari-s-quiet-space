export type Language = "sv" | "en";

export const translations = {
  sv: {
    tagline1: "Adaptiv Relations",
    tagline2: "Intelligens",
    heading: "Ett rum för reflektion.",
    subheading: "Ta den tid du behöver. Det finns ingen brådska här.",
    tapToBegin: "Tryck för att börja",
    privacyNote: "Din konversation är privat och säker.",
    connected: "Ansluten",
    ariLabel: "ARI",
    youLabel: "Du",
    reflecting: "ARI reflekterar…",
    listening: "ARI lyssnar…",
    tapToSpeak: "Tryck för att tala",
    speaking: "Lyssnar…",
    ariSpeaking: "ARI talar…",
    openingPrompt: "Innan vi börjar – vill du berätta lite om vad som fick dig att komma hit just nu?",
    responses: [
      "Tack för att du delar det med mig. Det låter som något som betyder mycket för dig.",
      "Jag hör dig. Vill du berätta mer om hur det får dig att känna?",
      "Det är en betydelsefull tanke. Vad kommer upp för dig när du stannar vid den?",
      "Jag är här med dig. Ta den tid du behöver.",
      "Jag uppskattar att du litar på mig med det. Vad mer tänker du på?",
    ],
  },
  en: {
    tagline1: "Adaptive Relationship",
    tagline2: "Intelligence",
    heading: "A space for reflection.",
    subheading: "Take your time. There is no rush here.",
    tapToBegin: "Tap to begin",
    privacyNote: "Your conversation is private and secure.",
    connected: "Connected",
    ariLabel: "ARI",
    youLabel: "You",
    reflecting: "ARI is reflecting…",
    listening: "ARI is listening…",
    tapToSpeak: "Tap to speak",
    speaking: "Listening…",
    ariSpeaking: "ARI is speaking…",
    openingPrompt: "Before we begin — what made you want to be here right now?",
    responses: [
      "Thank you for sharing that with me. It sounds like something that matters to you.",
      "I hear you. Would you like to tell me more about how that makes you feel?",
      "That is a meaningful thought. What comes up for you when you sit with it?",
      "I am here with you. Take whatever time you need.",
      "I appreciate you trusting me with that. What else is on your mind?",
    ],
  },
} as const;

export function getTranslations(lang: Language) {
  return translations[lang];
}
