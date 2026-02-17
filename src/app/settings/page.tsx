"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cpu, ArrowLeft } from "lucide-react";
import { getSettings, saveSettings, getPollinationsStats } from "./actions";
import { SettingsCard } from "./components/settings-card";

export default function SettingsPage() {
  const [pollinationsKey, setPollinationsKey] = useState("");
  const [isSaving, setIsPlaying] = useState(false);
  const [stats, setStats] = useState<{ balance: number; models: string[] } | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchStats = async (key: string) => {
    if (!key || key.length < 10) return;
    setIsLoadingStats(true);
    try {
      const data = await getPollinationsStats(key);
      setStats(data);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const keyFromUrl = params.get("api_key");
      if (keyFromUrl) {
        setPollinationsKey(keyFromUrl);
        window.history.replaceState(null, "", window.location.pathname);
        setMessage({ type: "success", text: "Klucz API zaimportowany! Zapisz go." });
        fetchStats(keyFromUrl);
      }
    }

    async function load() {
      const settings = await getSettings();
      const pKey = settings.find(s => s.key === "POLLINATIONS_API_KEY")?.value || "";
      setPollinationsKey(pKey);
      if (pKey) fetchStats(pKey);
    }
    load();
  }, []);

  const handleSave = async () => {
    setIsPlaying(true);
    setMessage(null);
    try {
      await saveSettings("POLLINATIONS_API_KEY", pollinationsKey);
      setMessage({ type: "success", text: "Ustawienia zapisane." });
      fetchStats(pollinationsKey);
    } catch {
      setMessage({ type: "error", text: "Błąd zapisu." });
    } finally {
      setIsPlaying(false);
    }
  };

  const handleGetKey = () => {
    const redirectUrl = window.location.origin + window.location.pathname;
    window.location.href = `https://enter.pollinations.ai/authorize?redirect_url=${encodeURIComponent(redirectUrl)}&permissions=profile,balance&models=openai,gemini&expiry=30`;
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl min-h-screen">
      <header className="mb-12">
        <Link href="/" className="text-sm text-primary hover:underline flex items-center gap-2 mb-6 w-fit transition-all hover:gap-3">
          <ArrowLeft size={16} /> Powrót do Dashboardu
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20"><Cpu className="w-8 h-8 text-primary" /></div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Ustawienia Systemu</h1>
            <p className="text-muted-foreground">Konfiguracja silników AI.</p>
          </div>
        </div>
      </header>

      <SettingsCard 
        pollinationsKey={pollinationsKey}
        setPollinationsKey={setPollinationsKey}
        isSaving={isSaving}
        onSave={handleSave}
        onGetKey={handleGetKey}
        message={message}
        stats={stats}
        isLoadingStats={isLoadingStats}
      />
    </main>
  );
}
