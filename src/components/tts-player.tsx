"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2, Loader2, Info, Settings, Sliders } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function TTSPlayer() {  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsMounted] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [settings, setSettings] = useState({
    voiceName: "",
    rate: 1.0,
    pitch: 1.0
  });
  const synth = useRef<SpeechSynthesis | null>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setIsMounted(true);
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("adhd-hub-tts-settings");
        if (saved) {
          try {
            setSettings(JSON.parse(saved));
          } catch (e) {
            console.error("Failed to load TTS settings", e);
          }
        }
        synth.current = window.speechSynthesis;
      }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isReady && settings.voiceName) {
      localStorage.setItem("adhd-hub-tts-settings", JSON.stringify(settings));
    }
  }, [settings, isReady]);

  const loadVoices = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Default to first Polish voice if not set and no saved setting exists
      if (!settings.voiceName && availableVoices.length > 0) {
        const plVoice = availableVoices.find(v => v.lang.includes("pl"));
        if (plVoice) {
          setSettings(prev => ({ ...prev, voiceName: plVoice.name }));
        }
      }
    }
  }, [settings.voiceName]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const article = document.getElementById("mdx-article");
      if (article) {
        const text = article.textContent || "";
        const cleanText = text
          .replace(/Powrót do HUBa/g, "")
          .replace(/Audio Reader/g, "")
          .replace(/Gotowy do czytania/g, "")
          .replace(/Słuchasz\.\.\./g, "")
          .replace(/\d+ znaków/g, "")
          .trim();
        // Defer to avoid synchronous state update warning
        setTimeout(() => setExtractedText(cleanText), 0);
      }

      setTimeout(() => loadVoices(), 0);
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, [loadVoices]);

  const speak = useCallback(() => {
    if (!extractedText || !synth.current) return;

    synth.current.cancel();

    const utterance = new SpeechSynthesisUtterance(extractedText);
    utterance.lang = "pl-PL";
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    
    if (settings.voiceName) {
      const selectedVoice = voices.find(v => v.name === settings.voiceName);
      if (selectedVoice) utterance.voice = selectedVoice;
    } else {
      const plVoice = voices.find(v => v.lang.includes("pl"));
      if (plVoice) utterance.voice = plVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synth.current.speak(utterance);
  }, [extractedText, voices, settings]);

  const togglePlay = () => {
    if (isPlaying) {
      synth.current?.cancel();
      setIsPlaying(false);
    } else {
      speak();
    }
  };

  if (!isReady) return null;

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/10 border border-primary/10 mb-8 sticky top-4 z-10 backdrop-blur-md">
      <div className="flex items-center gap-2 px-3 py-1 border-r border-primary/10">
        <Volume2 size={16} className="text-primary" />
        <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Audio Reader</span>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={togglePlay} 
        disabled={!extractedText}
        className="h-9 w-9 p-0 hover:bg-primary/20"
        aria-label={isPlaying ? "Wstrzymaj" : "Odtwórz"}
      >
        {isPlaying ? <Pause size={18} className="fill-primary" /> : <Play size={18} className="fill-primary" /> }
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => { synth.current?.cancel(); setIsPlaying(false); setTimeout(speak, 100); }} 
        disabled={!extractedText}
        className="h-9 w-9 p-0 hover:bg-primary/20"
        aria-label="Od początku"
      >
        <RotateCcw size={18} />
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-primary/20">
            <Settings size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-lg border-primary/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sliders size={20} className="text-primary" />
              Ustawienia Lektora
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Voice Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Głos</label>
              <select 
                className="w-full bg-background border border-primary/20 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={settings.voiceName}
                onChange={(e) => setSettings(prev => ({ ...prev, voiceName: e.target.value }))}
              >
                {voices.length === 0 && <option>Ładowanie głosów...</option>}
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tempo</label>
                <span className="text-xs text-primary">{settings.rate}x</span>
              </div>
              <input 
                type="range" min="0.5" max="2" step="0.1" 
                className="w-full accent-primary bg-primary/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                value={settings.rate}
                onChange={(e) => setSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
              />
            </div>

            {/* Pitch Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ton</label>
                <span className="text-xs text-primary">{settings.pitch}</span>
              </div>
              <input 
                type="range" min="0.5" max="2" step="0.1" 
                className="w-full accent-primary bg-primary/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                value={settings.pitch}
                onChange={(e) => setSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="text-[10px] font-medium text-muted-foreground ml-2 hidden sm:flex items-center gap-2">
        {isPlaying ? (
          <>
            <Loader2 size={10} className="animate-spin" /> Słuchasz...
          </>
        ) : (
          <>
            <Info size={10} /> {extractedText ? `${extractedText.length} znaków` : "Brak tekstu"}
          </>
        )}
      </div>
    </div>
  );
}
