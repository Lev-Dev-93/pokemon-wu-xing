# Phase 14 – dev.713: NPC-Laufanimationen

## Umsetzung
- Neues `src/npc-motion.js`: visuelle Interpolation von NPC-Patrouillenschritten anhand stabiler NPC-IDs.
- `src/main.js`: erfasst NPC-Positionen vor/nach einem Spielerschritt und zeichnet während laufender Bewegungen zusätzliche Frames.
- `src/art.js`: verwendet die individuelle Laufphase der NPCs.
- Keine Änderungen an Story, Karten, NPC-Patrouillenzuweisungen oder Fundgegenständen.
- Reduzierte Bewegung und Kartenwechsel deaktivieren die Interpolation.

## Prüfungen
- `npm test`: 1120 bestanden, 0 fehlgeschlagen.
- Fünf neue Tests in `tests/npc-motion.test.mjs`.
- Kein Browser-End-to-End-Test; dieser bleibt für die gebündelte Abnahme offen.

## Hinweis
Die NPC-Animation wird erst sichtbar, wenn ein NPC ein konfiguriertes Bewegungsmuster hat. Bestehende Story-NPCs erhalten in dieser Version keine neuen Patrouillen.
