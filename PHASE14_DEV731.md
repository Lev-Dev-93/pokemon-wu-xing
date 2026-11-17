# Phase 14 – dev.731: Zusammenhängende Landschaftsszenen

## Umsetzung
- Neues Modul `src/landscape-scenes-art.js`: 3×2-Kachel-Gestaltungen statt isolierter Kleindekoration.
- Startdorf: Blumen-/Gartenbeete; Beerendorf: Beerengärten; Professorenlichtung: Farnbeete; Züchterhof: Wiesenpflanzen.
- Je Karte höchstens zwei Szenen mit Abstand; nur wenn alle sechs Felder frei von Wegen, Portalen und Wänden sind.
- Kein Eingriff in Kollisionslogik, Story, NPCs, Fundgegenstände oder Speicherformat.

## Qualitätssicherung
- Sieben neue automatisierte Tests für regionale Sichtbarkeit, Determinismus, Grenzen, Wege, Wände, Portale und Renderintegration.
- Manueller Browsertest noch ausstehend; visuelle Überlagerungen mit älteren Dekorationen gesondert prüfen.
