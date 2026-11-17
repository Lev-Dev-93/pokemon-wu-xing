# Phase 13 – dev.685: Trainerkampf-Lebenszyklus

## Implementiert
- Neue reine Entscheidungslogik `src/trainer-battle-lifecycle.js` für laufende, unterbrochene und abgeschlossene Trainerkämpfe.
- Trainerkämpfe können nicht mehr nach einem Zwischensieg verlassen werden, solange Gegnerreserve existiert.
- Ein Trainer wird nur nach Sieg über das letzte Pokémon als besiegt markiert.
- Ausstehende Attacken-/Entwicklungsentscheidungen sperren den nächsten Gegner.
- Animationen und laufende Kämpfe sperren den Gegnerübergang.
- Sechs neue Regressionstests; ein bisheriger Quelltext-Muster-Test an die neue Ablaufprüfung angepasst.

## Prüfung
- `npm test`: 941/941 bestanden.
- `node --check` für geänderte JS-Dateien.
- ZIP-Integrität geprüft.
- Kein interaktiver Browser-End-to-End-Test durchgeführt.

## Offen
- Erfahrung und Levelaufstiege nach jedem Trainer-Pokémon vollständig in den Belohnungsdialog integrieren.
- Mehrteilige Trainerkämpfe mit realer UI, Animationen, Spielstand und Rückkehr zur Welt testen.
- Komplexe Wechsel- und Statusregeln weiter absichern.
- Phase 12 nicht gezielt verändert; Phase 13 nicht abgeschlossen.
