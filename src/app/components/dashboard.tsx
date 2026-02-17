"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, BookOpen, MessageSquare, Cpu } from "lucide-react";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    } 
  },
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HeroSection() {
  return (
    <motion.section variants={item} className="text-center space-y-4 py-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
        <Sparkles className="w-4 h-4" />
        <span>v0.01 Alpha</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
        ADHD HUB
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
        Od ADHDowca dla ADHDowców. <br className="hidden md:inline" />
        Zredukuj szum, odzyskaj sprawstwo.
      </p>
    </motion.section>
  );
}

export function BentoGrid() {
  return (
    <motion.section 
      variants={container}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Main Tool: Dopamine Menu */}
      <motion.div variants={item} className="md:col-span-2">
        <Link href="/tools/dopamine-menu">
          <Card className="h-full group cursor-pointer border-primary/20 hover:border-primary/50 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-xs overflow-hidden">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl group-hover:text-primary transition-colors">Menu Dopaminowe</CardTitle>
              <CardDescription className="text-lg">
                Twoja lista &quot;paliwa&quot; dla mózgu. <br />
                Wybierz przystawkę, danie główne lub deser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 pointer-events-none">
                Zbuduj menu
              </Button>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Knowledge Base */}
      <motion.div variants={item}>
        <Link href="/knowledge/merytoryka">
          <Card className="h-full group cursor-pointer hover:border-primary/50 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-xs overflow-hidden">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <BookOpen className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Pomoc dla Ciebie</CardTitle>
              <CardDescription>
                Fakty bez szumu. <br />
                Czytaj lub słuchaj opracowań.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 text-primary hover:text-primary/80 transition-colors pointer-events-none">
                Przeglądaj wiedzę →
              </Button>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Wiki Section */}
      <motion.div variants={item}>
        <Link href="/knowledge/wiki">
          <Card className="h-full group cursor-pointer border-dashed hover:border-primary/50 transition-all duration-300 bg-card/30 backdrop-blur-xs">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Sparkles className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Poznaj ADHD HUB</CardTitle>
              <CardDescription>
                Wiki projektu. <br />
                Wizja, twórcy i dokumentacja.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 text-muted-foreground group-hover:text-primary transition-colors pointer-events-none">
                Otwórz Wiki →
              </Button>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Community / Future Slot */}
      <motion.div variants={item}>
        <Card className="h-full opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 bg-card/30 border-dashed">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle>Społeczność</CardTitle>
            <CardDescription>
              Wymiana doświadczeń. <br />
              (Wkrótce w wersji 0.02)
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Settings Section */}
      <motion.div variants={item}>
        <Link href="/settings">
          <Card className="h-full group cursor-pointer hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-xs">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Ustawienia</CardTitle>
              <CardDescription>
                Konfiguracja systemu. <br />
                Klucze API i usługi.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </motion.div>
    </motion.section>
  );
}

export function WhySection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="pt-4"
    >
      <Card className="bg-accent/5 border-accent/10 p-8">
        <h3 className="text-xl font-semibold mb-2">Dlaczego ADHD HUB?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Bo większość narzędzi nas przebodźcowuje. Tutaj stawiamy na <strong>Zero Noise</strong>, 
          <strong>Sensory Friendly UI</strong> i funkcje, które realnie wspierają Twoją neurobiologię.
        </p>
      </Card>
    </motion.section>
  );
}
