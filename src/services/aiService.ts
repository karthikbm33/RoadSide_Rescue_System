import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

function getAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export async function diagnoseVehicleIssue(description: string, imageBase64?: string) {
  try {
    const ai = getAI();
    const model = "gemini-3-flash-preview";
    
    let contents: any;
    if (imageBase64) {
      contents = {
        parts: [
          { text: `You are an expert vehicle mechanic. Analyze this issue: ${description}. If an image is provided, use it to identify the problem. Provide a concise diagnosis and immediate steps the user should take while waiting for a professional. Keep the response under 150 words.` },
          { inlineData: { mimeType: "image/jpeg", data: imageBase64.split(',')[1] } }
        ]
      };
    } else {
      contents = {
        parts: [
          { text: `You are an expert vehicle mechanic. Analyze this issue: ${description}. Provide a concise diagnosis and immediate steps the user should take while waiting for a professional. Keep the response under 150 words.` }
        ]
      };
    }

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    return response.text || "No diagnosis could be generated.";
  } catch (error) {
    console.error("AI Diagnosis Error:", error);
    return "I'm sorry, I couldn't analyze the issue at this moment. Please wait for a professional mechanic.";
  }
}
