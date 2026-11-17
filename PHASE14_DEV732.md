# Phase 14 – dev.732: Landschaftskomposition

## Umsetzung
- Neues Modul `src/landscape-composition.js` mit einer gemeinsamen, deterministischen Zeichenreihenfolge für Wegrandvegetation, Pflanzengruppen, 2×2-Landschaftsmotive und 3×2-Landschaftsszenen.
- Große 3×2-Szenen belegen ihre Kacheln exklusiv; 2×2-Motive werden dort ausgeblendet. Kleinere Pflanzengruppen und Übergangsvegetation werden auf bereits belegten Kacheln ebenfalls ausgeblendet.
- `src/art.js` nutzt die Komposition statt vier unabhängiger, überlappender Renderdurchläufe.
- Keine Änderungen an Weltkarten, Kollisionsdaten, Portalen, NPCs, Story, Speicherformat oder Fundgegenständen.

## Qualitätssicherung
- 13 neue Tests für die vier Außenbereiche, Zeichenpriorität, Determinismus, Kachelgrenzen und Innenraum-Schutz.
- Bestehender Renderer-Integrationstest auf die gemeinsame Komposition angepasst.
- `npm test`: 1.245/1.245 bestanden.
- Manueller Browsertest und visuelle Prüfung der Komposition ausstehend.
