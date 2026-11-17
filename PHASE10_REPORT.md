# Phase 10 – Karten- und Engine-Stabilität (dev.619)

## Implementiert
- Schutz der Storyobjekte `player-bed` und `pokemon-pc` gegen Löschen und Manipulation über JSON.
- Unveränderliche Zuordnung bestehender Storytüren zu Innenräumen, einschließlich Zielkoordinaten und Gebäudeabmessungen; Türen dürfen weiterhin mit ihrem Gebäude verschoben werden.
- Zusätzliche Prüfung von importierten Türkoordinaten auf sichere Ganzzahlen.
- Verifikation des gespeicherten Layoutwerts nach dem Schreiben in den Browser-Speicher.
- Editor öffnet mit der aktuell gespielten Karte, sofern diese unterstützt wird.
- Hinweis zur dauerhaften Speicherung und zum JSON-Export.
- Sieben neue Tests für Kartenbegrenzungen, Türschutz, Rückkehrpunkte, Undo/Redo, Speichern/Laden und Spieler-Kollision.

## Tests
- `npm test`: 792/792 erfolgreich.
- `node --check src/main.js` und `node --check src/layout-runtime.js`: erfolgreich.
- ZIP-Integrität: geprüft.

## Einschränkungen / Abnahme
- Ein echter interaktiver Browsertest wurde in dieser Umgebung nicht ausgeführt. Daher noch keine vollständige Browserfreigabe.
- Die visuelle Vollständigkeit aller Karten und die Umwandlung sämtlicher Hintergrunddekorationen in eigenständige Objekte sind nicht Bestandteil dieser Sicherheitskorrektur.
- Alte Layouts ohne mittlerweile geschützte Storyobjekte werden aus Sicherheitsgründen abgelehnt; zuvor exportierte Layoutdatei als Sicherung aufbewahren.
- Layouts werden lokal im Browser gespeichert. Für die Übernahme in spätere Releases die JSON-Datei exportieren und bereitstellen.

## Browser-Abnahmeplan
1. Spielstart, Laden und Bewegung auf jeder erreichbaren Karte.
2. Türen vor und nach dem Verschieben betreten, Rückkehrpunkt prüfen.
3. Innenraummöbel bewegen, Kollision am alten und neuen Ort prüfen.
4. Rückgängig/Wiederholen, speichern, Browser neu laden.
5. JSON exportieren und wieder importieren; beschädigte JSON ablehnen.
6. Editor öffnen, Karte wechseln und schließen; normal weiterspielen.
