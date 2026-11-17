# Phase 16 – dev.777: Innenausstattung des Starthauses

- Neues transparentes PNG-Atlas `assets/tilesets/interior_furniture_32.png` mit acht originalen 32×32-Möbelmotiven.
- Neuer `src/interior-sprite-assets.js` für asynchrones Laden und Zeichnen, ohne DOM-Abhängigkeit in Node-Tests.
- Schlafzimmer: Bett, Regal, Pflanze, Schrankmotiv. Erdgeschoss: Küchenschrank, Herd, Tisch, Sofa, Regal und Pflanze.
- Fallback: bisherige Canvas-Umgebung bleibt sichtbar, solange das PNG noch lädt oder nicht geladen werden kann.
- Karten, Story, Kollisionen, Türen und NPCs unverändert. Kein Scheuneninnenraum in dieser Version.
- 1.340/1.340 automatisierte Tests bestanden. Kein manueller Browsertest durchgeführt.
