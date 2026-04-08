"use client";

import { useState, useEffect } from "react";
import { Copy, RotateCcw, ChevronLeft, Zap } from "lucide-react";

interface Quote {
  id: number;
  english: string;
  german: string;
  category: string;
}

const QUOTES: Quote[] = [
  {
    id: 1,
    english: "The only way to do great work is to love what you do.",
    german: "Der einzige Weg, großartige Arbeit zu leisten, ist, das zu lieben, was man tut.",
    category: "Work",
  },
  {
    id: 2,
    english: "Believe you can and you're halfway there.",
    german: "Glaube an dich selbst und du bist schon halb dort.",
    category: "Motivation",
  },
  {
    id: 3,
    english: "It does not matter how slowly you go as long as you do not stop.",
    german: "Es ist egal, wie langsam du gehst, solange du nicht stehen bleibst.",
    category: "Perseverance",
  },
  {
    id: 4,
    english: "The best time to plant a tree was 20 years ago. The second best time is now.",
    german: "Die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. Die zweitbeste Zeit ist jetzt.",
    category: "Action",
  },
  {
    id: 5,
    english: "You are never too old to set another goal or to dream a new dream.",
    german: "Du bist nie zu alt, um dir ein neues Ziel zu setzen oder einen neuen Traum zu träumen.",
    category: "Growth",
  },
  {
    id: 6,
    english: "The only impossible journey is the one you never begin.",
    german: "Die einzige unmögliche Reise ist diejenige, die du nie anfängst.",
    category: "Motivation",
  },
  {
    id: 7,
    english: "Your limitation—it's only your imagination.",
    german: "Deine Begrenzung liegt nur in deiner Vorstellung.",
    category: "Empowerment",
  },
  {
    id: 8,
    english: "Great things never came from comfort zones.",
    german: "Großartige Dinge entstehen nie in der Komfortzone.",
    category: "Growth",
  },
  {
    id: 9,
    english: "Dream it. Wish it. Do it.",
    german: "Träume davon. Wünsche es dir. Mach es.",
    category: "Action",
  },
  {
    id: 10,
    english: "Success doesn't just find you. You have to go out and get it.",
    german: "Erfolg findet dich nicht einfach. Du musst hingehen und ihn dir holen.",
    category: "Work",
  },
  {
    id: 11,
    english: "The harder you work for something, the greater you'll feel when you achieve it.",
    german: "Je harder du für etwas arbeitest, desto besser wirst du dich fühlen, wenn du es erreichst.",
    category: "Motivation",
  },
  {
    id: 12,
    english: "Dream bigger. Do bigger.",
    german: "Träume größer. Mache größer.",
    category: "Empowerment",
  },
  {
    id: 13,
    english: "Don't stop when you're tired. Stop when you're done.",
    german: "Höre nicht auf, wenn du müde bist. Höre auf, wenn du fertig bist.",
    category: "Perseverance",
  },
  {
    id: 14,
    english: "Wake up with determination. Go to bed with satisfaction.",
    german: "Wache auf mit Entschlossenheit. Gehe ins Bett mit Zufriedenheit.",
    category: "Motivation",
  },
  {
    id: 15,
    english: "Do something today that your future self will thank you for.",
    german: "Mache heute etwas, für das dein zukünftiges Ich dir danken wird.",
    category: "Action",
  },
  {
    id: 16,
    english: "Little things make big days.",
    german: "Kleine Dinge machen große Tage.",
    category: "Mindfulness",
  },
  {
    id: 17,
    english: "It's going to be hard, but hard does not mean impossible.",
    german: "Es wird schwer, aber schwer bedeutet nicht unmöglich.",
    category: "Perseverance",
  },
  {
    id: 18,
    english: "Don't wait for opportunity. Create it.",
    german: "Warte nicht auf Gelegenheit. Erschaffe sie.",
    category: "Action",
  },
  {
    id: 19,
    english: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    german: "Manchmal werden wir getestet, nicht um unsere Schwächen zu zeigen, sondern um unsere Stärken zu entdecken.",
    category: "Growth",
  },
  {
    id: 20,
    english: "The key to success is to focus on goals, not obstacles.",
    german: "Der Schlüssel zum Erfolg ist es, sich auf Ziele zu konzentrieren, nicht auf Hindernisse.",
    category: "Success",
  },
  {
    id: 21,
    english: "Dream as if you'll live forever, live as if you'll die today.",
    german: "Träume, als würdest du für immer leben, lebe, als würdest du heute sterben.",
    category: "Life",
  },
  {
    id: 22,
    english: "It always seems impossible until it's done.",
    german: "Es sieht immer unmöglich aus, bis es getan ist.",
    category: "Perseverance",
  },
  {
    id: 23,
    english: "Success is walking from failure to failure with no loss of enthusiasm.",
    german: "Erfolg ist das Gehen von Misserfolg zu Misserfolg ohne Verlust der Begeisterung.",
    category: "Success",
  },
  {
    id: 24,
    english: "You don't have to see the whole staircase, just take the first step.",
    german: "Du musst die ganze Treppe nicht sehen, mache einfach den ersten Schritt.",
    category: "Action",
  },
  {
    id: 25,
    english: "The future depends on what you do today.",
    german: "Die Zukunft hängt davon ab, was du heute tust.",
    category: "Action",
  },
  {
    id: 26,
    english: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
    german: "Glaube an dich. Du bist mutiger als du denkst, talentierter als du weißt, und zu mehr fähig, als du dir vorstellst.",
    category: "Empowerment",
  },
  {
    id: 27,
    english: "I am not afraid of storms, for I am learning how to sail my ship.",
    german: "Ich habe keine Angst vor Stürmen, denn ich lerne, mein Schiff zu steuern.",
    category: "Courage",
  },
  {
    id: 28,
    english: "Happiness is not something ready made. It comes from your own actions.",
    german: "Glück ist nicht etwas Fertiges. Es kommt aus deinen eigenen Handlungen.",
    category: "Happiness",
  },
  {
    id: 29,
    english: "The only limit to our realization of tomorrow is our doubts of today.",
    german: "Die einzige Grenze für die Verwirklichung von morgen ist unser Zweifel von heute.",
    category: "Motivation",
  },
  {
    id: 30,
    english: "You miss 100% of the shots you don't take.",
    german: "Du verfehlst 100% der Schüsse, die du nicht nimmst.",
    category: "Courage",
  },
  {
    id: 31,
    english: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    german: "Erfolg ist nicht endgültig, Misserfolg ist nicht tödlich: es ist der Mut weiterzumachen, der zählt.",
    category: "Courage",
  },
  {
    id: 32,
    english: "Your limitation—it's only your imagination.",
    german: "Deine Begrenzung liegt nur in deiner Vorstellung.",
    category: "Empowerment",
  },
  {
    id: 33,
    english: "Every day is a second chance.",
    german: "Jeden Tag bekommst du eine zweite Chance.",
    category: "Life",
  },
  {
    id: 34,
    english: "Believe something wonderful is about to happen.",
    german: "Glaube, dass etwas Wunderbares gleich passieren wird.",
    category: "Optimism",
  },
  {
    id: 35,
    english: "The expert in anything was once a beginner.",
    german: "Der Experte in allem war einmal ein Anfänger.",
    category: "Growth",
  },
  {
    id: 36,
    english: "You are capable of amazing things.",
    german: "Du bist zu erstaunlichen Dingen fähig.",
    category: "Empowerment",
  },
  {
    id: 37,
    english: "Your only limit is your mind.",
    german: "Deine einzige Grenze ist dein Geist.",
    category: "Empowerment",
  },
  {
    id: 38,
    english: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    german: "Ich habe gelernt, dass Menschen vergessen werden, was du gesagt hast, was du getan hast, aber sie werden niemals vergessen, wie du sie zum Fühlen gebracht hast.",
    category: "Life",
  },
  {
    id: 39,
    english: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    german: "Was hinter uns liegt und was vor uns liegt, sind winzige Angelegenheiten im Vergleich zu dem, was in uns liegt.",
    category: "Empowerment",
  },
  {
    id: 40,
    english: "Life is what we make it, always has been, always will be.",
    german: "Das Leben ist das, was wir daraus machen, immer war es so, immer wird es so sein.",
    category: "Life",
  },
  {
    id: 41,
    english: "The way to get started is to quit talking and begin doing.",
    german: "Der Weg zu beginnen ist, mit dem Reden aufzuhören und anfangen zu tun.",
    category: "Action",
  },
  {
    id: 42,
    english: "Only a life lived for others is a life worthwhile.",
    german: "Nur ein Leben, das für andere gelebt wird, ist ein wertvolles Leben.",
    category: "Purpose",
  },
  {
    id: 43,
    english: "The best revenge is massive success.",
    german: "Die beste Rache ist massiver Erfolg.",
    category: "Success",
  },
  {
    id: 44,
    english: "Don't let yesterday take up too much of today.",
    german: "Lass nicht, dass gestern zu viel von heute einnimmt.",
    category: "Mindfulness",
  },
  {
    id: 45,
    english: "You learn more from failure than from success.",
    german: "Du lernst mehr aus Misserfolg als aus Erfolg.",
    category: "Growth",
  },
  {
    id: 46,
    english: "It's not whether you get knocked down, it's whether you get up.",
    german: "Es geht nicht darum, ob du umgeworfen wirst, sondern ob du aufstehst.",
    category: "Resilience",
  },
  {
    id: 47,
    english: "If you can dream it, you can do it.",
    german: "Wenn du es träumen kannst, kannst du es tun.",
    category: "Motivation",
  },
  {
    id: 48,
    english: "Your potential is endless. Your growth is optional.",
    german: "Dein Potenzial ist grenzenlos. Dein Wachstum ist optional.",
    category: "Growth",
  },
  {
    id: 49,
    english: "Definiteness of purpose is the beginning of all achievement.",
    german: "Klarheit der Absicht ist der Beginn aller Errungenschaften.",
    category: "Purpose",
  },
  {
    id: 50,
    english: "Start where you are. Use what you have. Do what you can.",
    german: "Beginne, wo du bist. Nutze, was du hast. Mach, was du kannst.",
    category: "Action",
  },
];

export default function InspirationPage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [streak, setStreak] = useState(0);
  const [copied, setCopied] = useState(false);
  const [visitedToday, setVisitedToday] = useState(false);

  useEffect(() => {
    // Initialize streak from localStorage
    const lastVisit = localStorage.getItem("lastInspirationsVisit");
    const currentStreak = localStorage.getItem("inspirationsStreak") || "0";
    const today = new Date().toDateString();

    if (lastVisit !== today) {
      setVisitedToday(false);
    } else {
      setVisitedToday(true);
    }

    setStreak(parseInt(currentStreak, 10));

    // Update streak on first visit of the day
    if (lastVisit !== today) {
      const newStreak = parseInt(currentStreak, 10) + 1;
      localStorage.setItem("lastInspirationsVisit", today);
      localStorage.setItem("inspirationsStreak", newStreak.toString());
      setStreak(newStreak);
      setVisitedToday(true);
    }

    // Set random quote on load
    setCurrentQuoteIndex(Math.floor(Math.random() * QUOTES.length));
  }, []);

  const currentQuote = QUOTES[currentQuoteIndex];

  const handleRandomize = () => {
    let newIndex = Math.floor(Math.random() * QUOTES.length);
    while (newIndex === currentQuoteIndex && QUOTES.length > 1) {
      newIndex = Math.floor(Math.random() * QUOTES.length);
    }
    setCurrentQuoteIndex(newIndex);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
    setIsFlipped(false);
  };

  const handleCopyToClipboard = () => {
    const textToCopy = isFlipped ? currentQuote.german : currentQuote.english;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Daily Inspirations
          </h1>
          <p className="text-gray-600">
            Discover a new perspective each day
          </p>
        </div>

        {/* Streak Counter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center justify-center gap-3">
          <Zap className="w-6 h-6 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600">Daily Streak</p>
            <p className="text-3xl font-bold text-gray-900">{streak}</p>
          </div>
        </div>

        {/* Inspiration Card */}
        <div
          className="relative h-80 cursor-pointer perspective mb-8"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`w-full h-full transition-all duration-500 ease-in-out ${
              isFlipped ? "scale-95 opacity-90" : ""
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-2xl p-8 flex flex-col justify-between text-white">
              <div className="flex-1 flex items-center justify-center">
                <p className="text-2xl md:text-3xl font-semibold text-center leading-relaxed">
                  {isFlipped ? currentQuote.german : currentQuote.english}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {currentQuote.category}
                </span>
                <p className="text-sm opacity-75">
                  {isFlipped ? "🇩🇪 German" : "🇬🇧 English"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Click hint */}
        <p className="text-center text-gray-600 text-sm mb-8">
          Click the card to toggle between English and German
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <button
            onClick={handleRandomize}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Randomize
          </button>
          <button
            onClick={handleCopyToClipboard}
            className={`flex items-center gap-2 font-semibold py-3 px-6 rounded-lg shadow-md transition-colors ${
              copied
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-900"
            }`}
          >
            <Copy className="w-5 h-5" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Quote Counter */}
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Quote {currentQuoteIndex + 1} of {QUOTES.length}
          </p>
        </div>
      </div>
    </div>
  );
}
