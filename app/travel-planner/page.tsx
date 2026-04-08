import { Metadata } from "next";
import TravelPlannerClient from "@/components/TravelPlannerClient";

export const metadata: Metadata = {
  title: "Travel Planner | Your Name",
  description: "Plan your next adventure with AI-powered itineraries",
};

export default function TravelPlannerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Travel Planner</h1>
        <p className="text-gray-600">
          Create personalized itineraries powered by AI. Tell us where you want
          to go, how long you&apos;ll be there, and your travel style.
        </p>
      </div>
      <TravelPlannerClient />
    </div>
  );
}
