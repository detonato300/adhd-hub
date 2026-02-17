"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit2 } from "lucide-react";
import { DopamineItem } from "../types";

interface MenuSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
}

interface MenuGridProps {
  sections: readonly MenuSection[];
  items: DopamineItem[];
  loading: boolean;
  onEdit: (item: DopamineItem) => void;
  onDelete: (id: number) => void;
}

export function MenuGrid({ sections, items, loading, onEdit, onDelete }: MenuGridProps) {
  return (
    <motion.div
      key="grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-8 md:grid-cols-4"
    >
      {sections.map((section) => (
        <div key={section.id} className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-secondary/10 border">{section.icon}</div>
            <div>
              <h2 className="text-lg font-semibold leading-none">{section.title}</h2>
              <span className="text-xs text-muted-foreground">{section.desc}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="h-20 w-full bg-muted animate-pulse rounded-xl" />
            ) : (
              items.filter(i => i.category === section.id).map((item) => (
                <Card key={item.id} className="bg-card/50 border-primary/10 hover:border-primary/30 transition-all group relative overflow-hidden">
                  <CardContent className="p-4 flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-sm font-medium block">{item.label}</span>
                      {item.durationMinutes && (
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.durationMinutes} min</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => onEdit(item)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-primary hover:bg-primary/10 rounded-md transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-destructive hover:bg-destructive/10 rounded-md transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            {!loading && items.filter(i => i.category === section.id).length === 0 && (
              <div className="text-[10px] text-center py-8 border border-dashed rounded-xl text-muted-foreground">
                Pusto
              </div>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
