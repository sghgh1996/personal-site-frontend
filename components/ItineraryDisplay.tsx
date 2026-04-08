interface ItineraryDisplayProps {
  itinerary: string;
  loading: boolean;
}

export default function ItineraryDisplay({
  itinerary,
  loading,
}: ItineraryDisplayProps) {
  const renderContent = () => {
    if (!itinerary && loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg h-32 animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (!itinerary) {
      return null;
    }

    // Split itinerary into paragraphs and style them appropriately
    const lines = itinerary.split("\n");
    const elements = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Day headers (Day 1:, Day 2:, etc.)
      if (line.match(/^\*\*Day \d+:/)) {
        elements.push(
          <div
            key={`day-${i}`}
            className="mt-6 pt-6 border-t border-gray-200 first:mt-0 first:pt-0 first:border-t-0"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {line.replace(/\*\*/g, "")}
            </h3>
          </div>
        );
      }
      // Bold text (for section headers within days)
      else if (line.includes("**")) {
        elements.push(
          <p key={`p-${i}`} className="mt-3">
            {line.split("**").map((part, j) =>
              j % 2 === 1 ? (
                <span key={j} className="font-semibold text-gray-900">
                  {part}
                </span>
              ) : (
                <span key={j} className="text-gray-700">
                  {part}
                </span>
              )
            )}
          </p>
        );
      }
      // Regular content
      else {
        elements.push(
          <p key={`p-${i}`} className="text-gray-700 leading-relaxed">
            {line}
          </p>
        );
      }
    }

    return elements.length > 0 ? elements : null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="prose prose-sm max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Itinerary</h2>
        <div className="space-y-2">
          {renderContent()}
        </div>
        {loading && (
          <p className="text-sm text-gray-500 mt-6 animate-pulse">
            Generating your personalized itinerary...
          </p>
        )}
      </div>
    </div>
  );
}
