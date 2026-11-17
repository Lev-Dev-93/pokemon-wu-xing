# Phase 13 – dev.690: Vorbereitungsattacken

## Implementierung
- Vorbereitungsphase für Klingensturm (13), Fliegen (19), Solarstrahl (76), Schaufler (91), Schädelwumme (130), Himmelsfeger (143), Taucher (291), Sprungfeder (340).
- Die bestehende Solarstrahl-Mechanik wird wiederverwendet: genau eine AP-Abbuchung und verpflichtende Ausführung in der Folgerunde; Solarstrahl benötigt bei Sonne keine Vorbereitung.
- Schädelwumme erhöht die Verteidigungsstufe zu Beginn um eins.
- Während der Vorbereitungsphase von Fliegen, Schaufler, Taucher und Sprungfeder treffen gewöhnliche gegnerische Attacken nicht.
- Zwölf neue automatisierte Regressionstests; 982/982 bestanden.

## Grenzen und ausstehende Arbeiten
- Sondertreffer während der Unverwundbarkeitsphase (beispielsweise Erdbeben gegen Schaufler und Donner gegen Fliegen) sind noch nicht abgebildet.
- Unterbrechungen durch komplexe Status- und Wettereffekte sowie Sonderfähigkeiten benötigen weitere Abdeckung.
- Kein vollständiger interaktiver Browser-E2E-Test; Phase 13 bleibt offen.
- Phase 12 wurde nicht gezielt verändert.
