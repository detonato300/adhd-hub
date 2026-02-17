import { promises as fs } from "fs";
import path from "path";
import { chatCompletion } from "./pollinations";

/**
 * KnowledgeEngine (2026 Strategy):
 * Wykorzystujemy ogromne okno kontekstowe Gemini (1M+ tokenów).
 * Zamiast szukać fragmentów wektorowo, ładujemy całe opracowania jako kontekst systemowy.
 */
export async function getFullKnowledgeContext() {
  const knowledgeDir = path.join(process.cwd(), "src/app/knowledge");
  let context = "Oto baza wiedzy ADHD OS, na której musisz bazować odpowiedzi:\n\n";

  const folders = ["manual", "youtube"];
  
  for (const folder of folders) {
    const dirPath = path.join(knowledgeDir, folder);
    try {
      const files = (await fs.readdir(dirPath)).filter(f => f.endsWith(".mdx"));
      for (const file of files) {
        const content = await fs.readFile(path.join(dirPath, file), "utf-8");
        context += `--- TREŚĆ Z: ${folder}/${file} ---\n${content}\n\n`;
      }
    } catch {
      // Skip if folder doesn't exist or is inaccessible
      continue;
    }
  }

  return context;
}

export async function askGeminiWithContext(userQuery: string, apiKey?: string) {
  const knowledgeContext = await getFullKnowledgeContext();
  
  const systemPrompt = `
    Jesteś sercem ADHD OS. Twoim zadaniem jest wspieranie użytkownika w oparciu o dostarczoną wiedzę.
    Bądź konkretny, empatyczny i unikaj lania wody. Jeśli w bazie nie ma odpowiedzi, przyznaj to.
    
    ${knowledgeContext}
  `;

  return chatCompletion(userQuery, systemPrompt, apiKey);
}
