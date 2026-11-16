# Phase 6 – dev.539: Sicherer Karteneditor und Layout-Austausch

## Umgesetzt
- Rückgängig/Wiederholen für bis zu 40 bestätigte Layoutänderungen.
- JSON-Export und validierter JSON-Import mit Schema-, Karten- und Größenprüfung.
- Import, Undo, Redo und Zurücksetzen prüfen Kollisionen und Spielerposition.
- Keine automatische Überschreibung gespeicherter Layouts bei Import oder Reset; Speichern bleibt ausdrücklich.
- Die bestehende Spielwelt, Story und Kampflogik bleiben unverändert.

## Noch nicht Teil dieser Phase
- Fest in Hintergründe gezeichnete Möbel können weiterhin nicht verschoben werden.
- Der Karteneditor bleibt ein Entwicklermodus-Werkzeug, kein grafischer Drag-and-Drop-Editor.
- Die Browserabnahme durch den Nutzer steht aus.
