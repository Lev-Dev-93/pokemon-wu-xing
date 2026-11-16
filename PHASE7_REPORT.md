# Phase 7 – dev.559: Layout-Sicherheit und Wiederherstellung

## Implementiert
- Import-Vorschau mit betroffenen Karten und Objektanzahl; Bestätigung vor dem Übernehmen im Entwicklermodus.
- Importgrenzen für Objektanzahl, Abmessungen, sichere Ganzzahlen und bekannte Türziele, bevor Kollisionsgeometrie berechnet wird.
- Gesicherte vorherige Layoutversion bei explizitem Speichern, sofern die bisher gespeicherte Version valide ist.
- Wiederherstellen der letzten Sicherung als nicht automatisch gespeicherte Änderung.
- Import-Validierung für gespeicherte Layouts vor der Übernahme.

## Grenzen
- Noch kein grafischer Drag-and-Drop-Editor.
- Fest in Hintergründe gezeichnete Möbel sind noch nicht einzeln verschiebbar.
- Browserabnahme durch den Nutzer steht aus.
