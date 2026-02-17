# Specification: Bento Grid Dashboard (Landing Page)

**Track ID:** adhdhub-dashboard_20260216
**Type:** Feature
**Created:** 2026-02-16
**Status:** Approved

## Summary
Implementacja głównego interfejsu ADHD HUB opartego na układzie Bento Grid. Strona ma służyć jako Landing Page powitalny, który jasno komunikuje cel projektu i udostępnia skróty do kluczowych narzędzi (Toolbox, Baza Wiedzy).

## Context
Użytkownik z ADHD potrzebuje natychmiastowej jasności po wejściu do systemu. Bento Grid pozwala na wizualną separację funkcji, redukując paraliż decyzyjny i przebodźcowanie.

## User Story
Jako osoba z ADHD, chcę wejść na stronę główną i od razu wiedzieć, że jestem w bezpiecznym, uporządkowanym miejscu ("HUBie"), gdzie mogę łatwo przejść do Menu Dopaminowego lub artykułów merytorycznych bez szukania w skomplikowanym menu.

## Acceptance Criteria
- [ ] Strona główna (`src/app/page.tsx`) wykorzystuje układ Bento Grid (zgodnie z Product Guidelines).
- [ ] Hero Section z nową nazwą "ADHD HUB" i tagline'em "Od ADHDowca dla ADHDowców".
- [ ] Wykorzystanie niskokontrastowego trybu ciemnego (Dark Mode) jako domyślnego.
- [ ] Wyraźne "kotwice wizualne" (ikony/kolory) dla sekcji: Toolbox (Dopamine Menu) i Baza Wiedzy.
- [ ] Responsywność (Mobile First) – na małych ekranach Bento Grid przechodzi w liniową listę.

## Technical Notes
- Framework: Next.js 15 (App Router).
- UI: Tailwind CSS v4 + shadcn/ui.
- Ikony: Lucide React.
