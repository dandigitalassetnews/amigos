import { GoogleGenAI, Type } from "@google/genai";
import { PETS } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // API key is handled via environment variable process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async matchPet(userPreferences: string) {
    const petContext = PETS.map(p => 
      `ID: ${p.id}, Name: ${p.name}, Breed: ${p.breed}, Size: ${p.size}, Energy: ${p.energyLevel}, Traits: ${p.tags.join(', ')}, Description: ${p.description}`
    ).join('\n---\n');

    const prompt = `
      You are an expert Pet Matchmaker for "Amigos De Los Animales". 
      We are a rescue organization in Puerto Rico dedicated to finding homes for resilient and loyal local rescue dogs.
      
      Available Dogs:
      ${petContext}

      User Lifestyle Profile: "${userPreferences}"

      Analyze the user's needs and recommend the single best dog from the list above. 
      If no perfect match exists, pick the closest one.
      Provide a warm, encouraging reasoning in 2 sentences.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedPetId: { 
                type: Type.STRING, 
                description: "The ID of the recommended dog (1-8)" 
              },
              reasoning: { 
                type: Type.STRING, 
                description: "Warm explanation of why this dog fits their life" 
              },
              compatibilityScore: { 
                type: Type.INTEGER, 
                description: "Compatibility percentage from 0 to 100" 
              }
            },
            required: ["recommendedPetId", "reasoning", "compatibilityScore"]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Matchmaker Error:", error);
      return null;
    }
  }
}
