# Phase 14 – dev.724: Individuelle Dacharchitektur

- Neues Modul `src/roof-architecture.js`: vier eigenständige Pixel-Dachpaletten und Ziegelmuster (Schiefer, Kupfer, Ton, Moos), Dachkanten und stilabhängige Fassadenelemente.
- Forschungsgebäude mit kleinem Dachfenster, Wohnhäuser mit Holzstreben.
- Integration in `src/art.js` ohne Änderung von Grundrissen, Karten, Kollisionen, Portalen oder Story.
- Sechs neue Tests in `tests/roof-architecture-dev724.test.mjs`.
- `npm test`: 1174/1174 bestanden. Manueller Browsertest noch offen.
