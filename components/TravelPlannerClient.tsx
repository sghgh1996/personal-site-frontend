"use client";

import { useState } from "react";
import ItineraryDisplay from "./ItineraryDisplay";

export default function TravelPlannerClient() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("5");
  const [style, setStyle] = useState("balanced");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");
  const [error, setError] = useState("");

  const styles = [
    { value: "adventure", label: "Adventure & Outdoor" },
    { value: "luxury", label: "Luxury & Comfort" },
    { value: "budget", label: "Budget-Friendly" },
    { value: "cultural", label: "Cultural & Historical" },
    { value: "foodie", label: "Food & Wine" },
    { value: "balanced", label: "Balanced Mix" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setItinerary("");
    setLoading(true);

    if (!destination.trim()) {
      setError("Please enter a destination");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: destination.trim(),
          duration: parseInt(duration),
          style,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let fullItinerary = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullItinerary += chunk;
        setItinerary(fullItinerary);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred"
      );
      setItinerary("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium mb-2">
              Destination
            </label>
            <input
              id="destination"
              type="text"
              placeholder="e.g., Tokyo, Rome, Paris..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-2">
                Duration (days)
              </label>
              <input
                id="duration"
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="style" className="block text-sm font-medium mb-2">
                Travel Style
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {styles.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Generating Itinerary..." : "Generate Itinerary"}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Itinerary Display */}
      {(itinerary || loading) && (
        <ItineraryDisplay itinerary={itinerary} loading={loading} />
      )}
    </div>
  );
}
