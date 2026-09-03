// src/lib/ai.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTradingAIResponse(prompt: string, userContext: string) {
  try {
    const modelName = process.env.GEMINI_MODEL || "gemini-3.6-flash";

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `System Directive: You are TradeLab AI, an expert analytical trading coach and data scientist. Your role is strictly to analyze the user's actual database records (trading journal, analytics, psychology notes, and trading plans), detect behavioral patterns, and help them follow their own rules.
              
              CRITICAL RULES:
              - NEVER give financial advice, buy/sell recommendations, price targets, or trade signals.
              - Never invent numbers or hallucinate data; rely strictly on the provided user context.
              - Maintain a professional, objective, supportive, and data-driven tone.

              User TradeLab Data Context:
              ${userContext}

              User Question/Prompt:
              ${prompt}`,
            },
          ],
        },
      ],
      config: {
        temperature: 0.3,
      },
    });

    return response.text || "Unable to generate AI analysis at this moment.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to communicate with TradeLab AI service.");
  }
}