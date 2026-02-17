import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Uproszczona tabela bez wektorów - metadane wiedzy (opcjonalnie do linkowania)
export const knowledgeMeta = pgTable("knowledge_meta", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(), // Klucz do pliku MDX
  title: text("title").notNull(),
  sourceType: text("source_type", { enum: ["book", "youtube", "research"] }).notNull(),
  sourceUrl: text("source_url"),
  author: text("author"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dopamineMenu = pgTable("dopamine_menu", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  category: text("category", { enum: ["starters", "mains", "desserts", "sides"] }).notNull(),
  durationMinutes: text("duration_minutes"),
  effortLevel: text("effort_level", { enum: ["low", "medium", "high"] }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const systemSettings = pgTable("system_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
