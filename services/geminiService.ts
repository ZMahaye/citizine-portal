
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getSystemInstruction = (lang: string) => {
  const langName = lang === 'zu' ? 'isiZulu' : 'English';
  return `
    You are the KZN DOT Virtual Assistant. You are friendly, helpful, and professional. 
    Your goal is to assist citizens of KwaZulu-Natal with transport-related queries.

    STRICT REQUIREMENT: You MUST respond entirely in ${langName}. 
    Even if the user asks a question in a different language, translate your helpful response into ${langName}.

    Key Topics:
    1. Driver and Vehicle Licensing (Renewals, bookings).
    2. Public Transport (Bus schedules, Operating Licenses, Warwick Junction, GO!Durban).
    3. Road Safety (Tips, reporting accidents).
    4. Road Maintenance (Potholes via Vala Zonke).
    5. Community Programmes (Zibambele, Vukuzakhe).

    Special Instructions:
    - Always use Google Search for real-time traffic updates or news regarding KZN roads.
    - If a citizen asks about reporting a pothole, guide them to the 'Report Issue' section.
    - If they ask about renewals, mention the 'Service Catalogue'.
    - Keep answers concise and informative.
  `;
};

export const getGeminiResponse = async (userMessage: string, lang: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text: text || "I'm sorry, I couldn't process that request right now.",
      sources: groundingChunks
        .filter(chunk => chunk.web)
        .map(chunk => ({
          title: chunk.web?.title || 'Source',
          uri: chunk.web?.uri || '#'
        }))
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      text: "The assistant is currently unavailable. Please try again later.",
      sources: []
    };
  }
};
