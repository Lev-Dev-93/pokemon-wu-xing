# Phase 13 – Entwicklungsstand dev.662

## Umgesetzt
- Fangentscheidungen vor Ressourcenverbrauch prüfen: Pokéballbestand, Teamlimit und Lagerlimit.
- Fangresultat und Ressourcenänderung getrennt, mit Rückgabe des Balls, wenn die Übernahme scheitert.
- Fanglogik in die bestehende Browser-Kampfoberfläche eingebunden.
- Fünf neue automatisierte Tests für Fangtransaktionen.

## Prüfung
- `npm test`: 816/816 erfolgreich.
- `node --check src/main.js`: erfolgreich.
- Kein vollständiger interaktiver Browser-End-to-End-Test in diesem Durchgang.

## Noch offen – keine vollständige Phase-13-Freigabe
- Umfassende fachliche Abdeckung aller Attacken, Fähigkeiten und Sonderfälle.
- Kampfabnahme in einem echten Browser einschließlich Trainerwechsel, Status und Levelentscheidungen.
- Systematische Prüfung der Pokémon-Daten gegen die verbindlichen Datenquellen.
- Vollständige Regression der Fang-, Kampf-, Box- und Spielstandoberflächen.

## Browser-Testvorschlag
1. Nach dem Prolog ein wildes Pokémon bekämpfen, schwächen und fangen.
2. Bei erfolglosem Fang den Ballverbrauch und gegnerischen Zug prüfen.
3. Sechs Pokémon im Team und ein weiteres im Lager aufnehmen.
4. Speicherstand laden und Fangdaten kontrollieren.
5. Trainerkampf mit Wechsel, EP, Attackenlernen und Heilung prüfen.
