# Phase 13 – dev.681: Wechselaufträge

## Implementiert
- Kehrtwende (369) und Voltwechsel (521): Nach tatsächlichem Schaden entsteht ein Wechselauftrag für die angreifende Seite.
- Brüller (46), Wirbelwind (18), Drachenrute (525): Erzwungener Wechselauftrag für die Zielseite. Verwurzler blockiert den Auftrag.
- Der Zug pausiert bei einem offenen Wechselauftrag. Spielerwechsel über `switchTeamPokemon` quittiert einen Auftrag für die Spielerseite.
- Fünf Regressionstests; 921/921 Node-Tests bestanden.

## Wichtige Grenzen
- Noch keine automatische Auswahl/Abwicklung des gegnerischen Ersatz-Pokémon.
- Kein vollständiger UI-Dialog zur Wechselentscheidung; `pendingSwitch` muss vom Kampfcontroller ausgewertet werden.
- Rundenabschluss nach Auflösung und Wechsel-Prioritätsregeln benötigen noch Integrationstests.
- Browser-Gesamtabnahme nicht erfolgt. Phase 13 bleibt offen.
