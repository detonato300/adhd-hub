# Specification: Dopamine Menu Tool

**Track ID:** adhdhub-dopamine-menu_20260216
**Type:** Feature
**Created:** 2026-02-16
**Status:** Approved

## Summary
Budowa interaktywnego kreatora "Menu Dopaminowego". Narzędzie pozwala użytkownikowi skategoryzować czynności podnoszące poziom dopaminy na:
1. **Przystawki (Starters):** Szybkie, 5-10 min (np. spacer, kawa).
2. **Dania Główne (Mains):** Duże, wymagające wysiłku (np. trening, hobby).
3. **Desery (Desserts):** Przyjemności (np. Netflix, scrollowanie - z limitami).
4. **Dodatki (Sides):** Czynności wykonywane "przy okazji" (np. muzyka, podcasty).

## Context
Osoby z ADHD często zapominają, co im sprawia przyjemność lub co ich stymuluje w momencie kryzysu energetycznego. Gotowe menu eliminuje paraliż decyzyjny "co mam teraz ze sobą zrobić?".

## User Story
Jako osoba z ADHD, gdy czuję spadek energii lub paraliż, chcę otworzyć moje Menu Dopaminowe i wybrać jedną, konkretną czynność z odpowiedniej kategorii, aby wrócić do działania bez zastanawiania się nad opcjami.

## Acceptance Criteria
- [ ] Liniowy kreator (krok po kroku) dodawania czynności do menu.
- [ ] Podział na 4 kategorie (Przystawki, Dania Główne, Desery, Dodatki).
- [ ] Możliwość zapisywania własnych czynności w lokalnej bazie danych (PostgreSQL/Drizzle).
- [ ] Wizualna reprezentacja menu w formie karty (Bento-style summary).
- [ ] Mikro-nagrody (animacje) przy dodawaniu i "wybieraniu" czynności z menu.

## Technical Notes
- Frontend: React Server Components + Client Actions.
- Data: Drizzle ORM + PostgreSQL.
- Interakcje: Framer Motion.
