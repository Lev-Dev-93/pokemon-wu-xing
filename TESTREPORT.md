# Testbericht – 1.0.0-dev.3

Stand: 15.11.2026

## Automatisierte Unit-/Integrationstests

`npm test` lokal ausgeführt: **9/9 bestanden**.

1. Start und Kollision
2. Schlafzimmer ↔ Obergeschoss
3. Treppe beide Richtungen
4. Hofausgang und Rückweg
5. Höhenkollision
6. Speichern/Laden (Engine-Serialisierung)
7. Grafikszenen für alle vier Karten
8. Renderer verändert Engine-Zustand nicht
9. Portale und Spawn-Ziele gültig

## Browser-End-to-End

**Nicht erfolgreich abgeschlossen.** Ein Chromium-Headless-Aufruf wurde versucht, lief in dieser Ausführungsumgebung jedoch in ein Timeout. Daraus darf kein bestandener Browsertest abgeleitet werden.

## Visuelle Abnahme

**Noch ausstehend.** Vier Karten, Fenstergrößen und Spieler-Überdeckung müssen im veröffentlichten GitHub-Pages-Build betrachtet werden. Insbesondere auf Grafik-Kollision-Übereinstimmung und Portal-Sichtbarkeit achten.

## Manuelle Checkliste für die Freigabe

- Spiel lädt ohne Fehlermeldung; Spielname überall Pokémon Wu Xing
- Schlafzimmer: Bett, Schreibtisch, Schrank, Teppich und Tür sichtbar
- Obergeschoss: Flur und Treppe sichtbar; Treppe hin und zurück
- Erdgeschoss: Einrichtung sichtbar; Haustür in den Hof und zurück
- Hof: Hausfassade, Wege, Beete, Zäune und Höhentreppe sichtbar
- WASD/Pfeiltasten, Wandkollisionen und Rückkehrpunkte unverändert
- Speichern, Seite neu laden, Laden: gleiche Position
- Darstellung auf Desktop und Smartphone ohne unlesbare Elemente

**Status:** Entwicklungs-Paket zum Testen, keine stabile Freigabe.
