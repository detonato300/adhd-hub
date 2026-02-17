import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Youtube, Search } from "lucide-react";
import Link from "next/link";

export default function KnowledgeBasePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Baza Wiedzy ADHD OS</h1>
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
          Zrozumiałe, ustrukturyzowane i naukowo potwierdzone informacje o pracy z neuroatypowym mózgiem.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/knowledge/manual/mozh-adhd">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <BookOpen size={24} />
              </div>
              <CardTitle>Brakująca Instrukcja Obsługi</CardTitle>
              <CardDescription>Opracowanie książki Olimpii Jenczek.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70">
                Praktyczne wskazówki, neurobiologia i mechanizmy radzenia sobie z codziennością.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="opacity-50 h-full border-dashed">
          <CardHeader>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 text-secondary">
              <Youtube size={24} />
            </div>
            <CardTitle>ADHD Bez Ściemy (Wkrótce)</CardTitle>
            <CardDescription>Transkrypcje i opracowania z kanału YT.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/70 italic">
              System właśnie przetwarza pierwsze filmy...
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 bg-secondary/20 rounded-2xl p-8 flex items-center justify-between border border-secondary/30">
        <div>
          <h3 className="text-lg font-semibold mb-2">Szukasz czegoś konkretnego?</h3>
          <p className="text-sm text-foreground/60">Skorzystaj z wyszukiwarki semantycznej opartej na AI.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Search size={18} /> Szukaj w bazie
        </Button>
      </div>
    </main>
  );
}
