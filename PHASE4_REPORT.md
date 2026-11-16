# Phase 4 – dev.499 (technischer Zwischenstand zur Browserabnahme)

## Umgesetzt
- Neun individuelle Pokémon-Pixelporträts bleiben erhalten; zusätzliche artbezogene Details und Schattierungen.
- Dezente Kampf-Idle- und Einblendanimationen mit `prefers-reduced-motion`-Unterstützung.
- Neue, unabhängig editierbare Objekt-Blueprints (`src/world-layout.js`) mit stabilen IDs, Grafik-IDs, Rechtecken, Türen und Rückkehrzielen.
- `moveObject` verschiebt Gebäudetüren mit; `addObject` prüft neue Möbel/Gebäude; Überschneidungen und Kartengrenzen werden validiert.
- `migrateLayout` meldet geänderte Objekte und Spieler-Kollisionen, statt Speicherstände stillschweigend zu verändern.
- Neue automatisierte Regressionstests für Objektverschiebungen und Datenintegrität.

## Noch nicht abgeschlossen / bewusst nicht behauptet
- Objekt-Blueprints sind **noch nicht live an Renderer, Kollisionen und Portale angebunden**. Die bisherigen Karten bleiben deshalb unverändert. Ein vollständiger Ingame-Karteneditor ist noch nicht vorhanden.
- Pokémon-Sprites sind weiterhin 48x48 und keine vollständig neu gezeichneten hochauflösenden Artworks.
- Vollständige individuelle Bewegungsanimationen für alle 212 Basisarten sind nicht umgesetzt.
- Visuelle Browserabnahme muss noch stattfinden.

Der Versionsmarker dev.499 kennzeichnet die gebündelte Entwicklungsabgabe, nicht die vollständige Erfüllung aller ursprünglich geplanten grafischen Ziele.
