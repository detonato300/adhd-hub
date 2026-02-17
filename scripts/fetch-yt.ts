import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

async function fetchTranscript(videoId: string) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const outputDir = path.join(process.cwd(), "tmp", "transcripts");
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`[i] Fetching transcript for ${videoId}...`);
  
  try {
    // Pobieranie napisów przy użyciu yt-dlp
    // --write-auto-subs: pobiera napisy automatyczne
    // --sub-lang pl: wybiera polski
    execSync(`yt-dlp --write-auto-subs --skip-download --sub-lang pl --output "${outputDir}/%(id)s" "${url}"`);
    
    const filePath = path.join(outputDir, `${videoId}.pl.vtt`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      
      // Czyszczenie VTT - bardziej odporne podejście
      const lines = content.split('\n');
      const cleanLines: string[] = [];
      
      for (const line of lines) {
        // Pomijaj metadane VTT, timestampy i puste linie
        if (line.includes('-->') || line.trim() === 'WEBVTT' || line.trim() === '') continue;
        // Usuń tagi HTMLowe i powtórzenia (częste w auto-subs)
        const cleanLine = line.replace(/<[^>]*>/g, '').trim();
        if (cleanLine && !cleanLines.includes(cleanLine)) {
          cleanLines.push(cleanLine);
        }
      }
      
      const cleanContent = cleanLines.join(' ');
      console.log(`[+] Transcript cleaned. Length: ${cleanContent.length} chars.`);
      return cleanContent;
    }
  } catch (error) {
    console.error(`[!] Error fetching transcript: ${error}`);
  }
  return null;
}

// Przykład dla filmu "ADHD i Kariera"
fetchTranscript("VBCSNOBiTqw").then(content => {
    if (content) {
        fs.writeFileSync(path.join(process.cwd(), "tmp", "sample_transcript.txt"), content);
        console.log("[OK] sample_transcript.txt created.");
    }
});
