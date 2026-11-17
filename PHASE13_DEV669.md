# Phase 13 – dev.669: Defensive Fähigkeiten

## Implementiert
- Wunderwache (PokéAPI-Fähigkeits-ID 25) blockiert direkte physische und spezielle Schadensattacken bei neutraler oder verminderter Effektivität. Sehr effektive Attacken treffen; Statusattacken werden durch diese Prüfung nicht blockiert.
- Robustheit (ID 5) schützt bei vollen KP vor einem tödlichen direkten Treffer und lässt 1 KP übrig. Bei Mehrfachtreffern wird der Schutz nach dem ersten Treffer erneut anhand der tatsächlichen KP geprüft und greift daher nicht mehr, sobald KP verloren wurden.
- Beide Regeln sind in `src/battle.js` eingebunden und als reine Hilfsfunktionen in `src/ability-effects.js` testbar.

## Prüfungen
- Automatisierte Node-Tests einschließlich Kampfintegration.
- JavaScript-Syntaxprüfung und ZIP-Integritätsprüfung.

## Einschränkungen
- Keine interaktive Browserabnahme.
- Kein vollständiger Attacken-/Fähigkeiten-Regelabgleich. Phase 13 bleibt in Entwicklung.
