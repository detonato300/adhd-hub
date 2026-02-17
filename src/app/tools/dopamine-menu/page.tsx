"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { DopamineWizard } from "./components/wizard";
import { AiMenuGenerator } from "./components/ai-generator";
import { MenuGrid } from "./components/menu-grid";
import { MenuHeader } from "./components/menu-header";
import { RandomizerSection } from "./components/randomizer-section";
import { getDopamineItems, deleteDopamineItem } from "./actions";
import { DopamineItem } from "./types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "starters", title: "Przystawki", icon: "☕", desc: "5-10 min" },
  { id: "mains", title: "Dania Główne", icon: "🍽️", desc: "30+ min" },
  { id: "desserts", title: "Desery", icon: "🍦", desc: "Nagrody" },
  { id: "sides", title: "Dodatki", icon: "➕", desc: "W tle" },
] as const;

export default function DopamineMenuPage() {
  const [showWizard, setShowWizard] = useState(false);
  const [editItem, setEditItem] = useState<DopamineItem | undefined>(undefined);
  const [showAiGenerator, setShowAiGenerator] = useState(false);
  const [items, setItems] = useState<DopamineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [randomItem, setRandomItem] = useState<DopamineItem | null>(null);
  const [showRandomDialog, setShowRandomDialog] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDopamineItems();
      setItems(data as DopamineItem[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleEdit = (item: DopamineItem) => {
    setEditItem(item);
    setShowWizard(true);
  };

  const handleRandomize = () => {
    if (items.length === 0) return;
    setRandomItem(items[Math.floor(Math.random() * items.length)]);
    setShowRandomDialog(true);
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl min-h-screen">
      <MenuHeader 
        onShowAi={() => setShowAiGenerator(true)} 
        onToggleWizard={() => { setShowWizard(!showWizard); if(showWizard) setEditItem(undefined); }}
        showWizard={showWizard}
      />

      <AnimatePresence mode="wait">
        {showWizard ? (
          <motion.div key="w" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <DopamineWizard editItem={editItem} onComplete={() => { setShowWizard(false); setEditItem(undefined); fetchItems(); }} />
          </motion.div>
        ) : (
          <MenuGrid sections={SECTIONS} items={items} loading={loading} onEdit={handleEdit} onDelete={async (id) => { await deleteDopamineItem(id); fetchItems(); }} />
        )}
      </AnimatePresence>

      {!showWizard && items.length > 0 && <RandomizerSection onRandomize={handleRandomize} />}

      <Dialog open={showRandomDialog} onOpenChange={setShowRandomDialog}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-lg border-primary/20">
          <DialogHeader className="text-center">
            <DialogTitle className="flex flex-col items-center gap-4 text-2xl">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center animate-bounce"><Sparkles size={32} /></div>
              Twój wybór:
            </DialogTitle>
            <DialogDescription className="text-center pt-4">
              <span className="text-3xl font-bold text-foreground block mb-2">{randomItem?.label}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center mt-6">
            <Button onClick={() => setShowRandomDialog(false)} className="gap-2 bg-primary w-full sm:w-auto"><CheckCircle2 size={18} /> Wykonam to!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAiGenerator} onOpenChange={setShowAiGenerator}>
        <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-lg border-primary/20 max-h-[90vh] overflow-y-auto">
          <AiMenuGenerator onComplete={() => { setShowAiGenerator(false); fetchItems(); }} />
        </DialogContent>
      </Dialog>
    </main>
  );
}
