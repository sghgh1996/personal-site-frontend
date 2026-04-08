"use client";

import { Flashcard } from "@/data/flashcards";
import { useState } from "react";

interface FlashcardUIProps {
  card: Flashcard;
}

export default function FlashcardUI({ card }: FlashcardUIProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="h-64 cursor-pointer perspective"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front side */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg flex items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-center">
            <p className="text-white text-sm font-semibold mb-2 opacity-75">
              ENGLISH
            </p>
            <p className="text-white text-4xl font-bold text-balance">
              {card.english}
            </p>
            <p className="text-white text-xs mt-4 opacity-60">Click to reveal</p>
          </div>
        </div>

        {/* Back side */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg flex items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <p className="text-white text-sm font-semibold mb-2 opacity-75">
              GERMAN
            </p>
            <p className="text-white text-4xl font-bold text-balance">
              {card.german}
            </p>
            <p className="text-white text-xs mt-4 opacity-60">Click to reveal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
