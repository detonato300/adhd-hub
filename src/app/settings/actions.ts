"use server"

import { db } from "@/db";
import { systemSettings } from "@/db/schema/knowledge";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { ActionResult, success, failure } from "@/lib/utils/action-result";

export async function getSettings() {
  try {
    return await db.select().from(systemSettings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return [];
  }
}

export async function saveSettings(key: string, value: string): Promise<ActionResult> {
  try {
    // Check if exists
    const existing = await db.select().from(systemSettings).where(eq(systemSettings.key, key));
    
    if (existing.length > 0) {
      await db.update(systemSettings).set({ value, updatedAt: new Date() }).where(eq(systemSettings.key, key));
    } else {
      await db.insert(systemSettings).values({ key, value });
    }

    revalidatePath("/settings");
    return success(undefined);
  } catch (error) {
    console.error("Error saving setting:", error);
    return failure("Błąd podczas zapisywania ustawienia.");
  }
}

export async function getPollinationsStats(apiKey: string) {
  if (!apiKey) return null;

  try {
    const balanceRes = await fetch("https://text.pollinations.ai/balance", {
      headers: { "Authorization": `Bearer ${apiKey}` }
    });
    
    const modelsRes = await fetch("https://text.pollinations.ai/models");
    
    const balance = await balanceRes.json();
    const models = await modelsRes.json();

    return {
      balance: balance.balance,
      models: models.data?.map((m: { id: string }) => m.id) || []
    };
  } catch (error) {
    console.error("Error fetching Pollinations stats:", error);
    return null;
  }
}
