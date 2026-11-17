# Phase 13 – dev.700: Heilblockade und passive Regeneration

## Änderungen
- Heilblockade unterdrückt Überreste, Wasserring, Verwurzler, Wunschtraum und positive Wetterfähigkeits-Heilung während ihrer aktiven Runden.
- Aufheber bleibt bei Vergiftung unter Heilblockade vor Giftschaden geschützt, regeneriert aber keine KP.
- Die Restdauer der Heilblockade wird nach den Endrundeneffekten statt davor reduziert.
- Fünf neue Regressionstests (`tests/phase13-heal-block-dev700.test.mjs`).

## Abnahme
- `npm test`: 1061/1061 bestanden.
- JavaScript-Syntax geprüft; vollständiges ZIP auf Integrität geprüft.
- Keine Weltkarten oder Fundgegenstandspositionen verändert.
- Phase 13 bleibt offen: vollständige Browser-End-to-End-Abnahme und Katalogprüfung ausstehend.
