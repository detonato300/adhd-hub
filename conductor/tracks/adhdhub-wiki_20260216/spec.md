# Specification: Project Wiki & Help System

**Track ID:** adhdhub-wiki_20260216
**Type:** Documentation
**Created:** 2026-02-16
**Status:** Approved

## Summary
Implementacja zaawansowanego systemu dokumentacji projektu (Wiki) oraz sekcji pomocy dla użytkowników i kontrybutorów. System będzie wykorzystywał zestaw skilli `wiki-*` do analizy kodu i generowania merytorycznych, opartych na dowodach treści.

## Context
Projekt ADHD HUB wymaga jasnej dokumentacji technicznej dla twórców oraz przewodników "Zacznij tutaj" dla użytkowników, aby zminimalizować barierę wejścia i paraliż analityczny.

## Goals
1. Stworzenie Onboardingu "Zero to Hero" dla nowych kontrybutorów.
2. Dokumentacja architektury systemu (Principal-Level Guide).
3. Automatyzacja changeloga projektu.

## Acceptance Criteria
- [ ] Wygenerowany plik `docs/onboarding/zero-to-hero.md` z copy-pasteable komendami setupu.
- [ ] Wygenerowany plik `docs/architecture/deep-dive.md` z diagramami Mermaid (Dark Mode).
- [ ] Struktura dokumentacji zaprojektowana przez `wiki-architect`.
- [ ] Automatyczny system generowania changeloga z historii Gita.

## Technical Notes
- Wykorzystanie skilli: `wiki-architect`, `wiki-onboarding`, `wiki-page-writer`, `wiki-changelog`.
- Format: Markdown/MDX kompatybilny z Next.js.
- Diagramy: Mermaid.js.
