# Phase 14 – dev.727: Dorfplätze und Wegegestaltung

- Neues Modul `src/settlement-plaza-art.js`: ortsabhängige, deterministische Pflaster- und Wegranddetails für Startdorf, Beerendorf, Professorenlichtung und Züchterhof.
- Sichtbare Pflasterakzente an vierseitigen Kreuzungen und dezente Randsteine entlang bestehender Wege.
- Integration in `src/art.js` nach der vorhandenen Wegezeichnung, vor Landschaftsdetails.
- Keine Veränderung von Karten, Kollisionen, Portalen, Story oder Fundgegenständen. Portalkacheln bleiben von neuen Akzenten frei.
- Sechs neue Tests; insgesamt 1.202 automatisierte Tests erfolgreich. Manueller Browsertest ausstehend.
