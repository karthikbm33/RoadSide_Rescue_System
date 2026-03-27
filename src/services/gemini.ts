import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const getGeminiResponse = async (message: string) => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: message,
    config: {
      systemInstruction: "You are a helpful Roadside Rescue AI assistant. You help users with vehicle problems, diagnostics, and general inquiries about the service. Be professional, empathetic, and concise. If the user has a serious mechanical problem, suggest they request a nearby specialist mechanic.",
    },
  });

  return response.text;
};

export const getNearbyMechanics = async (location: { latitude: number; longitude: number }, serviceType: string) => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Find 3 professional mechanic shops or service centers near my location for ${serviceType}. Provide their names, addresses, and what they specialize in.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      }
    },
  });

  // Extract URLs and text
  const text = response.text;
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  return {
    text,
    links: groundingChunks
      .filter(chunk => chunk.maps?.uri)
      .map(chunk => ({
        title: chunk.maps?.title || "View on Maps",
        url: chunk.maps?.uri
      }))
  };
};
