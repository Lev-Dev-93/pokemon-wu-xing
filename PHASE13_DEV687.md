# Phase 13 – dev.687: Trainerkampf-Integration und Wechselkorrekturen

## Implementiert
- Ein durch Eintrittsfallen besiegtes neu eingewechseltes Pokémon kann durch das zuvor aktive Pokémon ersetzt werden, sofern dieses noch kampffähig ist.
- Offene Lern- und Entwicklungsentscheidungen sperren manuelle Wechsel sowie Kampfaktionen; bestehende Dialoge werden nicht durch die Teamauswahl überschrieben.
- Sechs neue Regressionstests. Zwei alte Tests erwarteten einen verfrühten Kampfverlust und wurden an die korrigierte Regel angepasst.

## Tests
- `npm test`: 952/952 bestanden.
- `node --check`: JavaScript-Syntax geprüft.
- Browser-End-to-End-Test eines mehrteiligen Trainerkampfs mit Lern- und Entwicklungsdialogen: noch offen.

## Grenzen
- Es handelt sich um eine gezielte Stabilisierung der Trainerkampf-Integration, nicht um eine vollständige Browserabnahme.
- Phase 12 nicht gezielt verändert. Phase 13 bleibt offen.
