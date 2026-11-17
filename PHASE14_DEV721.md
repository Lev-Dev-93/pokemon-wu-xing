# Phase 14 – dev.719–dev.721: Natürlichere NPC-Bewegungen

## dev.719 – Bewegungsrhythmus
- Konfigurierbares `patrolEvery` für die Anzahl der aktiven Simulationstakte je Schritt.
- Beerendorfer Spaziergänger läuft nur noch bei jedem zweiten Takt.

## dev.720 – Wiederkehrende Ruhephasen
- Optionale `pauseEvery`/`pauseTicks`-Parameter für reproduzierbare Pausen.
- Ruhephasen verbrauchen keine Wegpunkte; nach einer Pause wird die Route korrekt fortgesetzt.
- Ungültige Parameter werden sicher abgelehnt und bei der Weltprüfung gemeldet.

## dev.721 – Regression und Speicherstände
- Neun neue automatisierte Tests für Bewegung, Pausen, Parameter, Storyschutz und deterministisches Fortsetzen nach Speichern/Laden.
- Vollständige Testsuite: 1.158 bestanden, 0 fehlgeschlagen.
- Keine neuen Fundgegenstände, keine Story- oder Kartenänderungen.
- Manuelle Browsertests für diesen Stand noch ausstehend.
