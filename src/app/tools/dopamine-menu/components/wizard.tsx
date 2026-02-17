"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Coffee, Utensils, IceCream, Plus, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { addDopamineItem, updateDopamineItem } from "../actions";

const steps = [
  { id: "name", title: "Szczegóły aktywności", description: "Krótka, jasna nazwa aktywności." },
  { id: "category", title: "Wybierz kategorię", description: "Gdzie pasuje ta czynność?" },
  { id: "details", title: "Szczegóły (opcjonalnie)", description: "Ile czasu i energii to wymaga?" },
  { id: "confirm", title: "Gotowe?", description: "Zapisz zmiany w menu." },
];

const categories = [
  { id: "starters", label: "Przystawka", icon: <Coffee className="w-5 h-5 text-blue-400" />, desc: "5-10 min, na start" },
  { id: "mains", label: "Danie Główne", icon: <Utensils className="w-5 h-5 text-green-400" />, desc: "30+ min, głębokie ładowanie" },
  { id: "desserts", label: "Deser", icon: <IceCream className="w-5 h-5 text-pink-400" />, desc: "Nagroda po pracy" },
  { id: "sides", label: "Dodatek", icon: <Plus className="w-5 h-5 text-purple-400" />, desc: "Przy okazji (muzyka, podcast)" },
];

type DopamineCategory = "starters" | "mains" | "desserts" | "sides";
type EffortLevel = "low" | "medium" | "high";

export function DopamineWizard({ onComplete, editItem }: { onComplete: () => void, editItem?: {
  id: number;
  label: string;
  category: string;
  durationMinutes: string | null;
  effortLevel: string | null;
} }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    label: editItem?.label || "",
    category: (editItem?.category as DopamineCategory) || "starters",
    durationMinutes: editItem?.durationMinutes || "",
    effortLevel: (editItem?.effortLevel as EffortLevel) || "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSave = async () => {
    setIsSubmitting(true);
    const res = editItem 
      ? await updateDopamineItem(editItem.id, formData)
      : await addDopamineItem(formData);
    setIsSubmitting(false);
    
    if (res.success) {
      onComplete();
    } else {
      alert("Coś poszło nie tak...");
    }
  };

  return (
    <Card className="max-w-lg mx-auto border-primary/20 bg-card/50 backdrop-blur-md">
      <CardHeader>
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Krok {currentStep + 1} z {steps.length}</span>
          <span className="font-medium text-primary">{steps[currentStep].title}</span>
        </div>
        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary" 
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="min-h-[300px] flex flex-col justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {currentStep === 0 && (
              <div className="space-y-4">
                <p className="text-muted-foreground">{steps[0].description}</p>
                <Input 
                  placeholder="np. Szybki spacer, Zaparzenie herbaty..."
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="text-lg py-6"
                  autoFocus
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-1 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.id as DopamineCategory })}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      formData.category === cat.id 
                        ? "border-primary bg-primary/10 ring-1 ring-primary" 
                        : "border-border hover:border-primary/30 bg-card"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-background border">{cat.icon}</div>
                    <div>
                      <div className="font-medium">{cat.label}</div>
                      <div className="text-xs text-muted-foreground">{cat.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Czas trwania (minuty)</label>
                  <Input 
                    type="number" 
                    placeholder="np. 15"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium">Poziom wysiłku</label>
                  <div className="flex gap-2">
                    {["low", "medium", "high"].map((level) => (
                      <Button
                        key={level}
                        variant={formData.effortLevel === level ? "default" : "outline"}
                        onClick={() => setFormData({ ...formData, effortLevel: level as EffortLevel })}
                        className="flex-1 capitalize"
                      >
                        {level === "low" ? "Mały" : level === "medium" ? "Średni" : "Duży"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">{formData.label}</h3>
                <p className="text-muted-foreground">
                  Zostanie dodane do kategorii: <strong>{categories.find(c => c.id === formData.category)?.label}</strong>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between border-t py-4 bg-muted/20">
        <Button 
          variant="ghost" 
          onClick={prev} 
          disabled={currentStep === 0 || isSubmitting}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Wstecz
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button 
            onClick={next} 
            disabled={!formData.label && currentStep === 0}
            className="gap-2"
          >
            Dalej <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleSave} 
            disabled={isSubmitting}
            className="gap-2 bg-primary"
          >
            {isSubmitting ? "Zapisywanie..." : "Zapisz w Menu"} <Check className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
