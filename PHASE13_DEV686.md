# Phase 13 – dev.686: EP und Belohnungen nach jedem Trainer-Pokémon

## Änderungen
- `renderBattle()` löst die EP-Vergabe nach jedem besiegten Gegner aus, bevor der nächste Trainergegner angeboten wird.
- Der bestehende Schutz `rewardDone` verhindert wiederholte Vergabe beim erneuten Zeichnen.
- Lern- und Entwicklungsentscheidungen müssen vor dem nächsten Gegner abgeschlossen werden.
- `advanceTrainerOpponent()` vergibt keine EP mehr; die vorherige Doppelvergabe wurde entfernt.
- Nach Abschluss der Belohnungsdialoge werden Team und Spielstand synchronisiert bzw. gespeichert.
- Fünf neue Regressionstests, insgesamt 946.

## Grenzen
- EP-Formel ist weiterhin die vorhandene vereinfachte Testformel (`Gegnerlevel × 12`), keine vollständig kanonische Pokémon-EP-Berechnung.
- Die neuen Integrationstests prüfen den UI-Quelltext und die reine Trainerzustandslogik; sie ersetzen keinen Browser-End-to-End-Test.
- Kompletter Trainerkampf mit Animationen, Levelaufstieg und Rückkehr zur Oberwelt muss noch im Browser abgenommen werden.
- Phase 12 wurde nicht gezielt verändert. Phase 13 bleibt offen.
