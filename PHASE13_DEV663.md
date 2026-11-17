# Phase 13 – dev.663: Fangtransaktionen gegen doppelte Ausführung

- Fangentscheidungen werden beim ersten Commit als verbraucht markiert.
- Wiederholte Aufrufe derselben Entscheidung verursachen weder doppelte Pokémon noch zusätzlichen Ballverbrauch.
- Drei Regressionstests für erfolgreichen Fang, Fehlversuch und abgelehnte Entscheidung.

## Grenzen
Phase 13 ist **nicht vollständig freigegeben**: Vollständige Attacken-/Fähigkeitenabdeckung, Pokémon-Datenabgleich und interaktive Browserabnahme sind noch offen.
