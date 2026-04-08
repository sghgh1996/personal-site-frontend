"use client";

import { flashcards } from "@/data/flashcards";
import FlashcardUI from "@/components/FlashcardUI";
import { useState, useEffect } from "react";

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deck, setDeck] = useState(flashcards);

  const currentCard = deck[currentIndex];

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Flashcards</h1>
          <p className="text-gray-600">
            Learn English-German vocabulary with interactive flashcards
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">
              Progress: {currentIndex + 1} of {deck.length}
            </p>
            <p className="text-sm text-gray-600">
              {Math.round(((currentIndex + 1) / deck.length) * 100)}%
            </p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / deck.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-12">
          <FlashcardUI card={currentCard} />
        </div>

        {/* Card Counter */}
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-gray-700">
            Card {currentIndex + 1}/{deck.length}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            ← Previous
          </button>

          <button
            onClick={handleShuffle}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors"
          >
            🔀 Shuffle
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === deck.length - 1}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Info */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            💡 <span className="font-semibold">Tip:</span> Click on the card to
            flip it and see the translation. Use the navigation buttons or
            keyboard arrows to move through the deck.
          </p>
        </div>
      </div>
    </div>
  );
}
