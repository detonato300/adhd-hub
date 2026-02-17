"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ShieldCheck, Key, Sparkles, ExternalLink } from "lucide-react";
import { AiStats, LoadingStats } from "./ai-stats";

interface SettingsCardProps {
  pollinationsKey: string;
  setPollinationsKey: (val: string) => void;
  isSaving: boolean;
  onSave: () => void;
  onGetKey: () => void;
  message: { type: "success" | "error"; text: string } | null;
  stats: { balance: number; models: string[] } | null;
  isLoadingStats: boolean;
}

export function SettingsCard({
  pollinationsKey,
  setPollinationsKey,
  isSaving,
  onSave,
  onGetKey,
  message,
  stats,
  isLoadingStats
}: SettingsCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-xs border-primary/10">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <CardTitle>Pollinations.ai (BYOP)</CardTitle>
        </div>
        <CardDescription>
          Wprowadź swój klucz API Pollinations (sk_... lub pk_...), aby aktywować funkcje generatywne. 
          Model &quot;Bring Your Own Pollen&quot; zapewnia pełną kontrolę nad kosztami i prywatnością.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium flex items-center gap-2">
              <Key size={14} className="text-muted-foreground" />
              Pollinations API Key
            </label>
            <Button 
              variant="link" 
              size="sm" 
              onClick={onGetKey}
              className="h-auto p-0 text-xs text-primary flex items-center gap-1"
            >
              Pobierz klucz (BYOP) <ExternalLink size={10} />
            </Button>
          </div>
          <Input 
            type="password" 
            placeholder="sk_..." 
            value={pollinationsKey}
            onChange={(e) => setPollinationsKey(e.target.value)}
            className="bg-background/50 border-primary/20 focus:border-primary"
          />
          <p className="text-[10px] text-muted-foreground">
            Klucz jest przechowywany lokalnie w Twojej bazie danych i nie jest wysyłany do centralnego serwera ADHD HUB.
          </p>
        </div>
        
        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={14} className="text-green-500" />
            Połączenie zabezpieczone lokalnie
          </div>
          <Button onClick={onSave} disabled={isSaving} className="gap-2">
            <Save size={16} /> {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
          </Button>
        </div>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"}`}
          >
            {message.text}
          </motion.div>
        )}

        {stats && <AiStats balance={stats.balance} models={stats.models} />}
        {isLoadingStats && <LoadingStats />}
      </CardContent>
    </Card>
  );
}
