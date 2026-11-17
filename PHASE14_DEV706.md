# Phase 14 – dev.706: Treppen- und Höhenmechanik

## Implementiert
- `canMove` verlangt gültige ganzzahlige, direkt benachbarte Koordinaten und begehbare Quell- und Zielkacheln.
- Höhenwechsel über markierte Treppen sind nur um genau eine Höhenstufe möglich; seitliches Betreten unmarkierter Höhenkanten bleibt gesperrt.
- `auditWorldHeights` prüft alle Karten auf fehlerhafte Höhenwerte, doppelte/blockierte Treppen und Treppen ohne angrenzende Höhenstufe.
- Vier neue Regressionstests, darunter eine echte Bewegung im Züchterhof.

## Prüfung
- `npm test`: 1080/1080 bestanden.
- `auditWorldHeights(maps)`: keine Probleme auf den bestehenden Karten.
- Browser-End-to-End in dieser Version **nicht** durchgeführt; GitHub-Browserabnahme bleibt offen.

## Unverändert
- Story, Kartenlayout, Portale, Rückkehrpunkte, Grafik und Fundgegenstandspositionen.

## Nächster Block
- Browserprüfung der Treppe und der Kartenrückkehr, anschließend grafische Überarbeitung des Startgebiets.
