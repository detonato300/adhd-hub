import { db } from "@/db";
import { systemSettings } from "@/db/schema/knowledge";
import { eq } from "drizzle-orm";

export interface PollinationsResponse {
  content: string;
}

async function getApiKey() {
  try {
    const setting = await db.query.systemSettings.findFirst({
      where: eq(systemSettings.key, "POLLINATIONS_API_KEY")
    });
    return setting?.value || process.env.POLLINATIONS_API_KEY;
  } catch {
    return process.env.POLLINATIONS_API_KEY;
  }
}

const POLLINATIONS_BASE_URL = "https://text.pollinations.ai/";
const RANDOM_SEED_RANGE = 1000000;

export async function chatCompletion(prompt: string, systemMessage?: string, providedApiKey?: string) {
  const apiKey = providedApiKey || await getApiKey();
  
  const messages = [];
  if (systemMessage) {
    messages.push({ role: "system", content: systemMessage });
  }
  messages.push({ role: "user", content: prompt });

  const response = await fetch(POLLINATIONS_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey && { "Authorization": `Bearer ${apiKey}` }),
    },
    body: JSON.stringify({
      messages,
      model: "openai", // Gemini jest mapowane jako 'openai' lub 'gemini' w Pollinations
      seed: Math.floor(Math.random() * RANDOM_SEED_RANGE),
    }),
  });

  if (!response.ok) {
    throw new Error(`Pollinations API error: ${response.statusText}`);
  }

  return { content: await response.text() };
}
