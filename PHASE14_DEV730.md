# Phase 14 – dev.730: Regionale Landschaftsmotive

## Umsetzung
- Neues reines Grafikmodul `src/landscape-landmarks-art.js`.
- Vier individuelle zusammenhängende 2×2-Kachel-Motive: Blumenbeete (Startdorf), Beerenhecken (Beerendorf), Farngruppen (Professorenlichtung), Weidegras (Züchterhof).
- Deterministische Platzierung nur auf freien Grünflächen; bestehende Wege, Portale, Wände und Kartenränder werden ausgelassen.
- Integration in `src/art.js` hinter den Spielfiguren; keine neuen Fundgegenstände, keine Änderung an Spielstandformat, NPCs, Story oder Kollisionslogik.

## Tests
- `npm test`: 1225/1225 erfolgreich, acht neue Regressionstests.
- ZIP-Integritätsprüfung durchgeführt.
- Manueller Browsertest steht noch aus. Besonders zu prüfen: Motive im tatsächlichen Spielbild, Überlagerung mit vorhandenen Dekorationen und Lesbarkeit der Wege.
