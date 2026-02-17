"use server"

import { db } from "@/db";
import { dopamineMenu } from "@/db/schema/knowledge";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { chatCompletion } from "@/lib/ai/pollinations";
import { ActionResult, success, failure } from "@/lib/utils/action-result";

const DopamineItemSchema = z.object({
  label: z.string().min(1, "Nazwa jest wymagana").max(100),
  category: z.enum(["starters", "mains", "desserts", "sides"]),
  durationMinutes: z.string().optional(),
  effortLevel: z.enum(["low", "medium", "high"]).optional(),
});

export async function addDopamineItem(data: z.infer<typeof DopamineItemSchema>): Promise<ActionResult> {
  const result = DopamineItemSchema.safeParse(data);
  
  if (!result.success) {
    return failure("Błąd walidacji", result.error.flatten().fieldErrors);
  }

  try {
    await db.insert(dopamineMenu).values(result.data);
    revalidatePath("/tools/dopamine-menu");
    return success(undefined);
  } catch (error) {
    console.error("Database error:", error);
    return failure("Błąd bazy danych. Spróbuj ponownie.");
  }
}

export async function updateDopamineItem(id: number, data: z.infer<typeof DopamineItemSchema>): Promise<ActionResult> {
  const result = DopamineItemSchema.safeParse(data);
  
  if (!result.success) {
    return failure("Błąd walidacji", result.error.flatten().fieldErrors);
  }

  try {
    await db.update(dopamineMenu).set(result.data).where(eq(dopamineMenu.id, id));
    revalidatePath("/tools/dopamine-menu");
    return success(undefined);
  } catch (error) {
    console.error("Update error:", error);
    return failure("Nie udało się zaktualizować elementu.");
  }
}

export async function deleteDopamineItem(id: number): Promise<ActionResult> {
  try {
    await db.delete(dopamineMenu).where(eq(dopamineMenu.id, id));
    revalidatePath("/tools/dopamine-menu");
    return success(undefined);
  } catch (error) {
    console.error("Delete error:", error);
    return failure("Nie udało się usunąć elementu.");
  }
}

export async function getDopamineItems() {
  try {
    return await db.select().from(dopamineMenu);
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch dopamine items");
  }
}

export async function generateDopamineMenu(userContext: string): Promise<ActionResult<unknown[]>> {
  const systemPrompt = `Jesteś asystentem ADHD, który tworzy "Menu Dopaminowe". 
  Na podstawie zainteresowań użytkownika wygeneruj listę aktywności w formacie JSON.
  
  KLUCZOWE FILOZOFIE:
  - Rozróżniaj "Dobrą/Odżywczą dopaminę" (ruch, twórczość, nauka, ekstremalne bodźce jak zimno) od "Szybkiej/Śmieciowej dopaminy" (social media, gry, podjadanie).
  - Skup się na promowaniu "Odżywczej" dopaminy jako bazy.
  
  Kategorie:
  - starters: Szybkie, niski wysiłek, na rozruch (5-10 min)
  - mains: Głęboka praca, projekty, hobby (30+ min)
  - desserts: Czysta przyjemność, nagrody
  - sides: Tło, niski wysiłek (muzyka, fidgeting)
  
  Wymagany format JSON (Array):
  [
    {
      "label": "Nazwa aktywności (np. Spacer 10 min [Odżywcza])",
      "category": "starters" | "mains" | "desserts" | "sides",
      "durationMinutes": "5", "15", "30+",
      "effortLevel": "low" | "medium" | "high"
    }
  ]
  
  Zwróć TYLKO czysty JSON, bez markdowna, bez komentarzy. Język polski.`;

  try {
    const { content } = await chatCompletion(userContext, systemPrompt);
    const cleanContent = content.replace(/```json/g, "").replace(/```/g, "").trim();
    const items = JSON.parse(cleanContent);
    return success(items);
  } catch (error) {
    console.error("AI Generation error:", error);
    return failure("Nie udało się wygenerować menu. Spróbuj ponownie.");
  }
}
