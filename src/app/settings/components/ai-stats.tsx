"use client";

import { motion } from "framer-motion";
import { Coins, Box, Cpu } from "lucide-react";

interface AiStatsProps {
  balance: number;
  models: string[];
}

export function AiStats({ balance, models }: AiStatsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 space-y-6 pt-6 border-t border-primary/10"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-1">
            <Coins size={12} className="text-yellow-500" />
            Aktualne Saldo
          </div>
          <div className="text-2xl font-bold text-foreground">
            {balance.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">pollen</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-1">
            <Box size={12} className="text-blue-500" />
            Dostępne Modele
          </div>
          <div className="text-2xl font-bold text-foreground">
            {models.length}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Twoje Silniki</h4>
        <div className="flex flex-wrap gap-2">
          {models.map((model) => (
            <span 
              key={model} 
              className="px-2 py-1 rounded-md bg-secondary/20 border border-primary/5 text-[10px] font-mono text-primary/80"
            >
              {model}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function LoadingStats() {
  return (
    <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
      <Cpu className="animate-spin" size={24} />
      <span className="text-xs uppercase tracking-widest">Pobieranie statusu API...</span>
    </div>
  );
}
