# Phase 14 – dev.711: Umgebungsanimationen

## Implementiert
- Neues, deterministisches Modul `src/terrain-animation.js` für Wasserreflexe am Bach und dezente Grasbewegung auf Außenkarten.
- Wasseranimation berücksichtigt die bestehenden Brückenkoordinaten und zeichnet keine Reflexe auf die Brücke.
- Grasanimation meidet blockierte Felder, Wege und Portale; vorhandene Kartendaten bleiben unverändert.
- Integration in den bestehenden Canvas-Renderzyklus von `src/main.js`.
- Unterstützung für `prefers-reduced-motion` (statische Darstellung).
- Vier neue automatisierte Regressionstests in `tests/terrain-animation-dev711.test.mjs`.

## Prüfung
`npm test`: 1110/1110 Tests bestanden. Kein vollständiger Browser-End-to-End-Test in diesem Block.

## Unverändert
Story, Kartenlayout, NPC-Positionen, Fundgegenstandspositionen und Kampfmechanik.
