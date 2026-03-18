import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateBg(prompt: string, filename: string) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });
    
    let found = false;
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(path.join(process.cwd(), 'public', filename), buffer);
        console.log(`Saved ${filename}`);
        found = true;
        break;
      }
    }
    if (!found) {
      console.error(`No image data found for ${filename}`);
    }
  } catch (e) {
    console.error(`Error generating ${filename}:`, e);
  }
}

async function main() {
  const mockupsDir = path.join(process.cwd(), 'public', 'mockups');
  if (!fs.existsSync(mockupsDir)) {
    fs.mkdirSync(mockupsDir, { recursive: true });
  }
  const prompts = [
    "A minimalist modern apartment interior with a blank white wall in the center. Soft natural lighting. A discreet green plant in the corner. Photorealistic, interior design photography.",
    "A modern minimalist living room with a blank light gray concrete wall in the center. Soft natural lighting. A sleek modern sofa at the bottom. Photorealistic.",
    "A minimalist interior with a blank white wall. Soft morning sunlight casting gentle shadows. A small wooden stool with a vase. Photorealistic.",
    "A modern apartment with a blank white wall in the center. Minimalist decor, soft natural lighting, a discreet plant. Photorealistic, high quality.",
    "A minimalist room with a blank warm white wall. Soft natural lighting. A modern armchair partially visible at the bottom. Photorealistic, interior photography."
  ];
  
  for (let i = 0; i < prompts.length; i++) {
    await generateBg(prompts[i], `mockups/bg${i + 1}.jpg`);
  }
}

main();
