# Phase 13 – dev.665: AP-Konsistenz beim Pokémon-Wechsel

- Beim Einwechseln werden AP aus dem aktuellen Teamdatensatz übernommen statt aus möglicherweise veralteten Kampf-Caches.
- Beim Auswechseln werden die aktuellen AP weiterhin im Teamdatensatz gesichert.
- Zwei neue Regressionstests: veralteter Cache nach AP-Wiederherstellung; AP-Erhalt über zwei Wechsel.
- 825/825 automatisierte Tests erfolgreich (`npm test`).
- Keine interaktive Browserabnahme durchgeführt.

## Noch offen für eine vollständige Phase-13-Freigabe

Vollständiger Daten- und Regelabgleich aller unterstützten Attacken und Fähigkeiten, Trainer-KI und Wechselstrategien, End-to-End-Browserkämpfe sowie Spielstandmigration unter realen Bedingungen. Phase 13 bleibt in Entwicklung.
