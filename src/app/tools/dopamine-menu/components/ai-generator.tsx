"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { generateDopamineMenu, addDopamineItem } from "../actions";
import { toast } from "sonner";

interface GeneratedItem {
  label: string;
  category: "starters" | "mains" | "desserts" | "sides";
  durationMinutes?: string;
  effortLevel?: "low" | "medium" | "high";
  selected?: boolean;
}

export function AiMenuGenerator({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<"input" | "loading" | "review">("input");
  const [prompt, setPrompt] = useState("");
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setStep("loading");
    
    const res = await generateDopamineMenu(prompt);
    
    if (res.success && res.data) {
      setGeneratedItems((res.data as GeneratedItem[]).map((i) => ({ ...i, selected: true })));
      setStep("review");
    } else {
      toast.error("Błąd generowania. Spróbuj ponownie.");
      setStep("input");
    }
  };

  const handleSave = async () => {
    const selected = generatedItems.filter(i => i.selected);
    let successCount = 0;

    setStep("loading");

    for (const item of selected) {
      const res = await addDopamineItem({
        label: item.label,
        category: item.category,
        durationMinutes: item.durationMinutes,
        effortLevel: item.effortLevel
      });
      if (res.success) successCount++;
    }

    toast.success(`Dodano ${successCount} pozycji do menu!`);
    onComplete();
  };

  const toggleSelection = (index: number) => {
    const newItems = [...generatedItems];
    newItems[index].selected = !newItems[index].selected;
    setGeneratedItems(newItems);
  };

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Analizuję Twoje zainteresowania...</p>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Wybierz co Ci pasuje</h3>
          <p className="text-sm text-muted-foreground">Zaznacz aktywności, które chcesz dodać do swojego menu.</p>
        </div>

        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
          {["starters", "mains", "desserts", "sides"].map(cat => {
            const catItems = generatedItems.map((item, idx) => ({ ...item, originalIndex: idx })).filter(i => i.category === cat);
            if (catItems.length === 0) return null;

            return (
              <div key={cat} className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold pl-1">{cat}</h4>
                {catItems.map((item) => (
                  <div 
                    key={item.originalIndex}
                    onClick={() => toggleSelection(item.originalIndex)}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      item.selected 
                        ? "bg-primary/10 border-primary/30" 
                        : "bg-card border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Checkbox checked={item.selected} className="mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.label}</p>
                      <div className="flex gap-2 mt-1">
                        {item.durationMinutes && <span className="text-[10px] bg-background/50 px-1.5 py-0.5 rounded text-muted-foreground">{item.durationMinutes} min</span>}
                        {item.effortLevel && <span className="text-[10px] bg-background/50 px-1.5 py-0.5 rounded text-muted-foreground">{item.effortLevel} effort</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button variant="ghost" onClick={() => setStep("input")} className="flex-1">Wróć</Button>
          <Button onClick={handleSave} className="flex-1 gap-2">
            <CheckCircle2 size={16} /> Zapisz wybrane
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> 
          Generator AI
        </h3>
        <p className="text-sm text-muted-foreground">
          Opisz krótko co lubisz, nad czym pracujesz, lub na co masz ochotę. 
          AI przygotuje propozycje dopasowane do kategorii.
        </p>
      </div>

      <Textarea
        placeholder="Np. Lubię gry RPG, programowanie w Pythonie, spacery z psem. Mam problem z rozpoczęciem pracy rano. Chciałbym też czytać więcej książek sci-fi."
        className="min-h-[120px] bg-background/50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button 
        onClick={handleGenerate} 
        disabled={!prompt.trim()} 
        className="w-full gap-2"
      >
        <Sparkles size={16} /> Wygeneruj propozycje
      </Button>
    </div>
  );
}
