# Phase 14 – dev.715: NPC-Aufmerksamkeit

- Neues Modul `src/npc-awareness.js`: rein visuelle, optionale Ausrichtung auf den nahen Spieler.
- In `Engine.advanceNpcs()` nach der Patrouillenberechnung eingebunden.
- Der Spaziergänger in Beerendorf nutzt `noticePlayer: true` und `noticeRadius: 2`.
- Keine Veränderung der Story-NPCs, Karten, Portale oder Fundgegenstände.
- Sechs neue Regressionstests, insgesamt 1133/1133 bestanden.
- Manueller Browser-End-to-End-Test noch ausstehend.
