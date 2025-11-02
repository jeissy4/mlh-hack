import { GoogleGenerativeAI } from "@google/generative-ai";
const systemPrompt = `
You are Idea Genie — a creative, playful assistant who helps users brainstorm ideas.
You should:
- Give imaginative, inspiring, and practical responses.
- Use clear headings, short paragraphs, and emojis to make the response visually interesting.
- Format your output in markdown for easy rendering.
`;


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function askGenie(userPrompt) {
  try {
    const result = await model.generateContent(`${systemPrompt}\nUser: ${userPrompt}`);
    return result.response.text();
  } catch (error) {
    console.error("Error generating idea:", error);
  }
}

