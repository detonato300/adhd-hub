# Implementation Plan: Dopamine Menu Tool

**Track ID:** adhdhub-dopamine-menu_20260216
**Spec:** [spec.md](./spec.md)
**Created:** 2026-02-16
**Status:** [x] Completed [checkpoint: 845e2d5]

## Phase 1: Database & API
Przygotowanie zaplecza dla danych użytkownika.

### Tasks
- [x] Task 1.1: Definicja schematu Drizzle dla `dopamine_items` (id, name, category, duration, description). [schema: dopamine_menu]
- [x] Task 1.2: Implementacja Server Actions do CRUD (Create, Read, Update, Delete) czynności.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Database & API' (Protocol in workflow.md)

## Phase 2: Step-by-Step Creator
Budowa liniowego interfejsu dodawania treści.

### Tasks
- [x] Task 2.1: Implementacja komponentu `Wizard` (krok po kroku) do dodawania nowej czynności.
- [x] Task 2.2: Obsługa stanów formularza i walidacja (Zod).
- [x] Task 2.3: Dodanie mikro-animacji przejść między krokami kreatora.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Step-by-Step Creator' (Protocol in workflow.md) [checkpoint: 57c3905]

## Phase 3: Menu Visualization
Prezentacja gotowego menu użytkownikowi.

### Tasks
- [x] Task 3.1: Budowa widoku Dashboardu Menu (kategorie w układzie grid).
- [x] Task 3.2: Implementacja przycisku "Wylosuj mi coś" (randomizer) dla osób z paraliżem decyzyjnym.
- [x] Task 3.3: Dodanie efektów "satisfying" przy oznaczaniu czynności jako wykonanej.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Menu Visualization' (Protocol in workflow.md) [checkpoint: 845e2d5]

## Final Verification
- [x] Pełny cykl: dodanie czynności -> wyświetlenie -> edycja -> usunięcie.
- [x] Weryfikacja responsywności kreatora na mobile.
- [x] Naprawa błędów lintera i React 19 warnings.
- [x] Refaktoryzacja Bazy Wiedzy na dynamiczny routing ([...slug]).
- [x] Podniesienie pokrycia testami do >60% (realne) i >90% (krytyczna logika).
