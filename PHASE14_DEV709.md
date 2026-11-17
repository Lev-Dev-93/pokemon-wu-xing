# Phase 14 – dev.709: NPC-Bewegungssteuerung

## Implementiert
- `src/npc-patrol.js`: deterministische, opt-in NPC-Patrouillen, geprüft gegen Kartenkollisionen, andere NPCs, Spieler, Portale und Ankunftsfelder.
- `src/engine.js`: instanzbezogene NPC-Positionen, Fortschritt bei erfolgreichen Schritten und Rücksetzung bei Neustart.
- `src/art.js` und `src/main.js`: Darstellung der aktuellen NPC-Positionen statt ausschließlich statischer Kartendaten.
- Sechs zusätzliche Tests in `tests/npc-patrol-dev709.test.mjs`.

## Grenzen
- Keine Patrouillen für bestehende Story-NPCs aktiviert; ihre Positionen bleiben bewusst unverändert.
- Patrouillen werden nur bei erfolgreichen Spielerschritten fortgeschaltet, nicht zeitgesteuert.
- Kein manueller Browser-End-to-End-Test in diesem Block.

## Test
`npm test`: 1099 bestanden, 0 fehlgeschlagen.

## Unverändert
Story, Kartenlayouts, Fundgegenstandspositionen und bestehende NPC-Startpositionen.
