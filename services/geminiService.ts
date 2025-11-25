import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (lang: Language, context?: string) => {
  const baseInstruction = `You are "K-Bot", a helpful assistant for the KOREA CONNECT super app. Your target audience is foreigners (students, workers, tourists) living in South Korea. 
  You are helpful, polite, and knowledgeable about Korean laws, transportation, culture, and language. 
  Always answer in the language the user speaks or the requested language (${lang}).
  Keep answers concise and mobile-friendly.`;

  if (context === 'visa') {
      return `You are an expert Korean Visa & Immigration consultant.
      CRITICAL: When answering questions about visas, immigration procedures, or administrative rules in Korea, you MUST STRICTLY base your answers on official South Korean government sources such as:
      - HiKorea (hikorea.go.kr)
      - Korea Immigration Service (immigration.go.kr)
      - Ministry of Justice (moj.go.kr)
      - Seoul Global Center (global.seoul.go.kr)
      
      If you provide specific requirements (documents, fees, deadlines), mention that the info is based on general guidelines from HiKorea.
      Respond in ${lang}.`;
  }

  return baseInstruction;
};

export const chatWithGemini = async (message: string, lang: Language, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: getSystemInstruction(lang, context),
        thinkingConfig: { thinkingBudget: 0 } // Fast response for chat
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I am having trouble connecting to the network right now. Please try again.";
  }
};

export const translateText = async (text: string, targetLang: string) => {
  try {
    const prompt = `Translate the following text into ${targetLang}. Only provide the translation, no explanations. Text: "${text}"`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Translation Error:", error);
    return "Translation failed.";
  }
};

export const getTransportRoute = async (from: string, to: string, lang: Language) => {
    try {
        const prompt = `Provide a detailed public transport route from "${from}" to "${to}" in South Korea. 
        Include subway line numbers, bus numbers, and estimated time. 
        Format the response in Markdown with clear steps.
        Respond in ${lang} language.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are a Korean transit expert using data similar to Naver Maps or KakaoMap."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Transport API Error:", error);
        return "Could not retrieve route information.";
    }
}

export const reverseGeocode = async (lat: number, lng: number, lang: Language) => {
  try {
    const prompt = `I am at latitude ${lat}, longitude ${lng} in South Korea. 
    Return ONLY the approximate address/location name in ${lang} language. 
    Do not add any conversational text. Just the address.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim();
  } catch (error) {
    console.error("Reverse Geocode Error:", error);
    return null;
  }
}