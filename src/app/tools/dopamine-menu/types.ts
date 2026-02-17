export interface DopamineItem {
  id: number;
  label: string;
  category: "starters" | "mains" | "desserts" | "sides";
  durationMinutes: string | null;
  effortLevel: string | null;
  createdAt: Date;
}
