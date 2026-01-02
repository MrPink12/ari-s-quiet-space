export type Language = "sv" | "en";

export const translations = {
  sv: {
    tagline1: "Adaptiv Relations",
    tagline2: "Intelligens",
    heading: "Ett rum för reflektion.",
    subheading: "Ta den tid du behöver. Det finns ingen brådska här.",
    nameLabel: "Vad ska jag kalla dig?",
    namePlaceholder: "Ditt namn",
    startButton: "Starta konversation",
    privacyNote: "Din konversation är privat och säker.",
    connected: "Ansluten",
    sendPlaceholder: "Dela vad du har på hjärtat…",
    sendHint: "Tryck Enter för att skicka · Shift+Enter för ny rad",
    ariLabel: "ARI",
    youLabel: "Du",
    reflecting: "ARI reflekterar…",
    listening: "ARI lyssnar…",
    welcome: (name: string) => 
      `Hej, ${name}.\n\nDet här är ett utrymme där du kan dela vad du har på hjärtat. Det finns inget rätt eller fel att säga.\n\nVad vill du prata om?`,
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
    nameLabel: "What should I call you?",
    namePlaceholder: "Your name",
    startButton: "Start conversation",
    privacyNote: "Your conversation is private and secure.",
    connected: "Connected",
    sendPlaceholder: "Share what is on your mind…",
    sendHint: "Press Enter to send · Shift+Enter for new line",
    ariLabel: "ARI",
    youLabel: "You",
    reflecting: "ARI is reflecting…",
    listening: "ARI is listening…",
    welcome: (name: string) => 
      `Hello, ${name}.\n\nThis is a space where you can share whatever is on your mind. There is no right or wrong thing to say.\n\nWhat would you like to talk about?`,
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
