# Phase 14 – dev.712: Charakter- und Laufanimationen

- Neue reine Render-Interpolation `src/character-motion.js` (120 ms, geglättete Kachelbewegung).
- Kameraführung folgt der interpolierten visuellen Position; Engine-Koordinaten, Kollisionsregeln und Speicherstände bleiben unverändert.
- Kartenwechsel, Teleports und blockierte Schritte starten keine Interpolation.
- Bei `prefers-reduced-motion` wird die Bewegung ohne Zwischenbilder dargestellt.
- Ruhende NPCs bleiben in der Ruhepose; Gehpose nur bei explizitem `moving`-Flag.
- Fünf neue Tests, zwei ältere statische Quelltexttests an die neue Render-Schnittstelle angepasst.
- Automatisierte Suite: 1115 bestanden, 0 fehlgeschlagen (`npm test`).
- Browser-End-to-End und visuelle Abnahme bewusst noch offen.
- Story, Karten, Gegenstandspositionen und vorhandene Grafikassets unverändert.
