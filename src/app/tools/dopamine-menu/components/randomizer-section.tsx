"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface RandomizerSectionProps {
  onRandomize: () => void;
}

export function RandomizerSection({ onRandomize }: RandomizerSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-16 text-center"
    >
      <Button 
        onClick={onRandomize}
        variant="outline" 
        className="gap-2 border-primary/20 hover:bg-primary/5 py-6 px-8 text-lg"
      >
        <Sparkles size={20} className="text-primary" /> Wylosuj mi coś
      </Button>
    </motion.div>
  );
}
