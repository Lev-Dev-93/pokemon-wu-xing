# Phase 14 – dev.733: Regionale Dorfplatzmotive

- Neues Modul `src/settlement-landmarks-art.js`: ortstypische 2×2-Kachel-Pflastermotive für Startdorf, Beerendorf und Professorenlichtung; 3-Kachel-Wegeakzent auf dem Züchterhof.
- Deterministische Auswahl des nächstgelegenen sicheren 2×2-Wegbereichs zur Kartenmitte; kein Portal, keine Wand und keine Änderung an Karten-/Storydaten.
- Einbindung in `src/art.js` nach dem bisherigen Pflaster-Rendering und vor der Vegetationskomposition.
- Sechs neue Tests für Sichtbarkeit, Determinismus, Pfad-/Portal-/Kollisionssicherheit, Begrenzung der Pixel und regionale Farbvarianten.
- Automatisierter Testlauf: 1251/1251 bestanden (`npm test`). Manueller Browsertest noch ausstehend.
