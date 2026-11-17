# Phase 14 – dev.734: Regionale Gartenanlagen

- Neues Modul `src/settlement-gardens-art.js` für regional unterschiedliche Original-Pixelblumenbeete in Startdorf, Beerendorf, Professorenlichtung und Züchterhof.
- Bevorzugt 2×2-Grasflächen neben Wegen; auf eng belegten Karten automatische kompakte Ein-Kachel-Gartenvariante.
- Keine Dekoration auf Wänden, Wegen, Portalen oder Kacheln der bestehenden Landschaftskomposition.
- Deterministische Auswahl, keine Änderung an Karten-, Kollisions-, NPC-, Story- oder Gegenstandsdaten.
- Sieben neue Tests: Sicherheit für vier Regionen, Reproduzierbarkeit, ungültige Eingaben und unterschiedliche Farbpaletten.
- Vollständiger automatisierter Testlauf: 1258/1258 bestanden. Manueller Browsertest ausstehend.
