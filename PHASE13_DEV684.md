# Phase 13 – dev.684: Mehrfachwechsel und Eintrittsfallen

## Änderungen
- `src/battle-pending-switch.js`: Gegnerwechsel verarbeitet aufeinanderfolgende durch Fallen verursachte K.O.s; ausgeschiedene Ersatz-Pokémon werden nicht erneut verwendet; Reserven bleiben konsistent.
- `src/battle-switch.js`: Wenn ein eingewechseltes Spieler-Pokémon durch Eintrittsfallen besiegt wird, wird ein weiterer Wechsel angeboten, sofern noch ein anderes Team-Pokémon verfügbar ist. Besteht keine weitere Option, endet der Kampf.
- `src/main.js`: Auflösung von Wechselaufträgen und Fortsetzung unterbrochener Züge werden miteinander verbunden; keine weitere Attackenauswahl während offener Fortsetzung.
- `tests/phase13-switch-chains-dev684.test.mjs`: fünf neue Regressionstests.

## Prüfung
- 935/935 automatisierte Node-Tests erfolgreich.
- JavaScript-Syntax und ZIP-Struktur werden bei der Paketierung geprüft.
- **Keine interaktive Browser-End-to-End-Abnahme durchgeführt.**

## Grenzen / nächste Arbeiten
- Mehrfachwechsel in kompletten Browser-Trainerkämpfen mit Animationen prüfen.
- Wechsel nach normalem K.O., Erfahrungspunkte und Trainerreserve weiterhin als vollständigen Ablauf testen.
- Die ursprüngliche aktive Spielerfigur wird bei einer durch Fallen ausgelösten Wechselkette nicht unmittelbar als weiterer Ersatz angeboten; das erhält die bisherige Semantik des Kampfabschlusses und bedarf eines gesonderten Regelabgleichs.
- Phase 12 nicht gezielt verändert; Phase 13 bleibt offen.
