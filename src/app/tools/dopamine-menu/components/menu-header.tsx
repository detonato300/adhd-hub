"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wand2, Plus, X } from "lucide-react";

interface MenuHeaderProps {
  onShowAi: () => void;
  onToggleWizard: () => void;
  showWizard: boolean;
}

export function MenuHeader({ onShowAi, onToggleWizard, showWizard }: MenuHeaderProps) {
  return (
    <header className="mb-12">
      <Link href="/" className="text-sm text-primary hover:underline flex items-center gap-2 mb-6 w-fit transition-all hover:gap-3">
        <ArrowLeft size={16} /> Powrót do Dashboardu
      </Link>
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Twoje Menu Dopaminowe</h1>
          <p className="text-muted-foreground">Zestaw gotowych aktywności, gdy Twój mózg mówi &quot;nie&quot;.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onShowAi} 
            variant="outline"
            className="gap-2 border-primary/20 hover:bg-primary/10"
          >
            <Wand2 size={18} className="text-purple-400" /> AI Generator
          </Button>
          <Button 
            onClick={onToggleWizard} 
            variant={showWizard ? "ghost" : "default"}
            className="gap-2"
          >
            {showWizard ? <><X size={18} /> Zamknij</> : <><Plus size={18} /> Dodaj potrawę</>}
          </Button>
        </div>
      </div>
    </header>
  );
}
