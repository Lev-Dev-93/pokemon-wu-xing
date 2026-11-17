# Phase 14 – dev.705: Welt-Engine-Audit und atomare Portalwechsel

## Implementiert
- `Engine.validPortalDestination` prüft Existenz, ganzzahlige Koordinaten, Kartengrenzen, feste Kollisionen und NPC-Belegung am Ankunftspunkt.
- `Engine.step` prüft das Portalziel **vor** jeder Änderung von Spielerposition, Höhenebene, Schrittzähler, Rückkehrankern oder Storyflags. Bei ungültigem Ziel wird die Bewegung abgewiesen.
- `Engine.transition` verwendet dieselbe zentrale Zielprüfung; direkte ungültige Aufrufe werfen weiterhin einen Fehler.
- Keine Änderung an Story, Kartenlayout, Platzierung von Fundgegenständen oder Grafiken.

## Automatisierte Tests
- `npm test`: 1.076 bestanden, 0 fehlgeschlagen.
- Vier neue Tests in `tests/phase14-dev705-portals.test.mjs`: alle bestehenden Portale, blockierter Spawn, NPC am Spawn, ungültige Koordinaten.
- Alle bestehenden Portalquellen und Zielpunkte sind nach dem neuen Validator gültig.

## Browserstatus
- Ein lokaler Chromium-Headless-Smoke-Test wurde versucht, lief jedoch nach 15 Sekunden in ein Timeout (kein DOM ausgegeben). **Kein erfolgreiches Browser-E2E nachgewiesen.**
- Visuelle Screenshotprüfung nicht durchgeführt.

## Nächste Abnahme
- GitHub Pages: Schlafzimmer → Erdgeschoss → Hof → Dorf und zurück; Innenraumtüren; Treppen; Speichern/Neuladen; Story-Trigger; Kollisionen; Touchsteuerung sofern verwendet.
- Die Höhenmechanik und Rückkehranker bedürfen einer weiteren eigenständigen funktionalen Prüfung; diese Version behauptet keine vollständige Phase-14-Abnahme.
