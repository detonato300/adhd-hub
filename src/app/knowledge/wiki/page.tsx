"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Code, Book, History, LayoutDashboard } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic load to prevent hydration mismatch with MDX wrappers
const AboutContent = dynamic(() => import("./about.mdx"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-muted/20 rounded-2xl" />
});

const wikiPages = [
  {
    slug: "zero-to-hero",
    title: "Developer Guide",
    description: "Setup, workflow i pierwsze zadanie.",
    icon: <Code className="w-5 h-5 text-blue-400" />,
    color: "bg-blue-500/10"
  },
  {
    slug: "architecture",
    title: "Architecture",
    description: "Filozofia Local-First i przepływ danych.",
    icon: <Book className="w-5 h-5 text-green-400" />,
    color: "bg-green-500/10"
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "Historia zmian i nowe funkcje.",
    icon: <History className="w-5 h-5 text-orange-400" />,
    color: "bg-orange-500/10"
  }
];

export default function WikiPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wrap in a microtask to avoid synchronous render warning
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4">
      {/* Home Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-12 transition-colors group">
        <LayoutDashboard size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Powrót do Dashboardu
      </Link>

      {/* Main Content Area */}
      <main className="min-h-[400px]">
        <AboutContent />
      </main>

      {/* Navigation Footer */}
      <footer className="mt-24 space-y-10 border-t border-primary/10 pt-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/40">Eksploruj Dokumentację</h3>
          <p className="text-sm text-muted-foreground/60">Wszystko, co musisz wiedzieć o ADHD HUB</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {wikiPages.map((page) => (
            <Link key={page.slug} href={`/knowledge/wiki/${page.slug}`}>
              <Card className="h-full group hover:border-primary/50 transition-all bg-card/40 backdrop-blur-xs cursor-pointer overflow-hidden border-primary/5 hover:bg-card/60">
                <CardHeader className="p-5 space-y-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${page.color} border border-white/5`}>
                    {page.icon}
                  </div>
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors text-base flex items-center justify-between">
                      {page.title}
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </CardTitle>
                    <CardDescription className="text-[11px] leading-relaxed mt-1 line-clamp-2">
                      {page.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
