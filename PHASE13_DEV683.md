# Phase 13 – dev.683: Zugfortsetzung nach Wechseln

## Implementiert
- `pendingTurn` hält noch ausstehende Kampfaktionen bei unterbrochenen Runden fest.
- `resumeInterruptedTurn()` setzt nach erledigtem Wechsel die Runde fort und wendet Rundeneffekte einmalig an.
- Pivot-Wechsel erlauben dem noch nicht handelnden Gegner seine Aktion.
- Erzwungene Wechsel lassen die ausstehende Aktion des ausgewechselten Pokémon entfallen.
- `main.js` bindet Spieler- und Gegnerwechsel an die Fortsetzung an.
- Vier neue automatisierte Regressionstests.

## Validierung
- 930/930 Node-Tests bestanden.
- JavaScript-Syntax geprüft.
- Browser-End-to-End-Test nicht durchgeführt.

## Offene Punkte
- Erzwungener Wechsel mit mehrfach hintereinander durch Eintrittsfallen besiegten Ersatz-Pokémon.
- Vollständige Browserabläufe für Trainer mit mehreren Reserve-Pokémon.
- Komplexe Wechselketten und UI-Animationsübergänge.
- Phase 12 bleibt funktional unverändert.
