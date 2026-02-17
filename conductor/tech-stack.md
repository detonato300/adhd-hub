# ADHD HUB Tech Stack

## Frontend & Core
- **Framework:** Next.js 15 (App Router) - Server Components dla wydajności.
- **Library:** React 19.
- **Language:** TypeScript - dla bezpieczeństwa typów i lepszego DX.
- **Patterns:** ActionResult - ujednolicony wzorzec odpowiedzi z akcji serwerowych.

## Styling & UI
- **Styling:** Tailwind CSS v4 - nowoczesne, szybkie stylowanie.
- **Components:** shadcn/ui - dostępne, modularne komponenty.
- **Icons:** Lucide React.

## Data & Storage
- **Database:** PostgreSQL (Self-hosted via Docker).
- **ORM:** Drizzle ORM - lekki, Type-safe SQL wrapper.
- **Content:** Local MDX files - statyczna baza wiedzy (bez RAG).

## Infrastructure (Local-first)
- **Containerization:** Docker + Docker Compose.
- **Initialization:**
  - **Windows:** `start.bat` (Wrapper dla PS1 z ominięciem polityk bezpieczeństwa).
  - **Linux/macOS:** `start.sh`.
- **Environment:** Dynamiczne wykrywanie portów i generowanie haseł w skryptach init.

## Testing & Quality
- **Unit Testing:** Vitest - nowoczesny runner testów jednostkowych.
- **E2E Testing:** Playwright - weryfikacja przepływów użytkownika.
- **Quality Audit:** Desloppify - narzędzie do monitorowania długu technicznego i zdrowia kodu.

## AI & Services
- **AI Integration:** Pollinations.ai (BYOP) - dla narzędzi wspierających (np. generator struktury zadań).
- **Audio (Sensory Friendly):** 
  - **TTS:** Web Speech API (SpeechSynthesis) - natywne odczytywanie artykułów w przeglądarce bez dodatkowych zależności.
  - **STT:** Web Speech API (SpeechRecognition) - dla sterowania głosowego i dyktowania.
- **Automation:** n8n (Self-hosted) - do automatyzacji komunikacji w Social Media (FB, IG, TikTok) oraz integracji z Discord/Telegram.
