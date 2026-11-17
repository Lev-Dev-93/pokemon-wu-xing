# Phase 14 – dev.729: Zusammenhängende Vegetation

## Umsetzung
- Neues Modul `src/vegetation-clusters-art.js`: deterministische, flächige Pflanzenverbände mit regionalen Paletten und unterschiedlichen Pflanzenformen.
- Integration in `src/art.js` als rein visuelle Ebene für Startdorf, Beerendorf, Professorenlichtung und Züchterhof.
- Grasfelder werden durch unregelmäßige, zusammenhängende Vegetationsgruppen statt ausschließlich isolierter Einzelakzente ergänzt.
- Wegfelder, Portale, Wände und Kartenränder werden ausgeschlossen. Bestehende Story, Geometrie und Fundgegenstände bleiben unverändert.

## Prüfung
- `npm test`: 1217/1217 erfolgreich, sieben neue Regressionstests.
- Browser-Sichtprüfung noch ausstehend; insbesondere prüfen, ob die Pflanzengruppen mit NPCs, Gebäuden und Wegkanten optisch harmonieren.
