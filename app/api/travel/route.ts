import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {
  try {
    const { destination, duration, style } = await request.json();

    if (!destination || !duration || !style) {
      return new Response("Missing required fields", { status: 400 });
    }

    const systemPrompt = `You are an expert travel planner with years of experience creating personalized itineraries. 
Your task is to create a detailed day-by-day itinerary based on the user's preferences.

For each day, structure your response with:
- **Day X: [Title]** (morning/afternoon/evening activities)

Include:
- Specific attractions and landmarks to visit
- Recommended restaurants and cuisine types
- Travel times and transportation tips
- Local insights and cultural tips
- Estimated costs where relevant

Make the itinerary practical, engaging, and tailored to the specified travel style.`;

    const prompt = `Create a ${duration}-day itinerary for ${destination} with a ${style} travel style. 
The itinerary should be detailed, practical, and inspiring. Format it clearly with each day separated and activities organized by time of day.`;

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: prompt,
      temperature: 0.8,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Travel API error:", error);
    return new Response("Failed to generate itinerary", { status: 500 });
  }
}
