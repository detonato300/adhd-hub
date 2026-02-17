import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";

const articles = [
  {
    slug: "mozh-adhd",
    title: "Mózg osób z ADHD działa inaczej",
    description: "Zrozumienie biologicznych podstaw ADHD: Kora przedczołowa, układ nagrody i DMN.",
    category: "manual"
  },
  {
    slug: "dopamina",
    title: "Dobra vs Szybka Dopamina",
    description: "Jak zarządzać układem nagrody, aby unikać paraliżu i budować trwałe sprawstwo.",
    category: "merytoryka"
  },
  {
    slug: "podatek-adhd",
    title: "Podatek od ADHD",
    description: "Jak przestać płacić za zapominalstwo i odzyskać kontrolę nad finansami.",
    category: "merytoryka"
  }
];

export default function MerytorykaPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Wiedza - Pomoc dla Ciebie</h1>
        <p className="text-muted-foreground text-lg">
          Rzetelne opracowania merytoryczne, które pomogą Ci zrozumieć Twój system operacyjny.
        </p>
      </header>

      <div className="grid gap-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/knowledge/${article.category}/${article.slug}`}>
            <Card className="group hover:border-primary/50 transition-all bg-card/50 backdrop-blur-xs cursor-pointer">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen size={20} />
                </div>
                <div className="flex-1 space-y-1">
                  <CardTitle className="group-hover:text-primary transition-colors flex items-center justify-between">
                    {article.title}
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
