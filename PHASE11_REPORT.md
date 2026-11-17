# Phase 11 – Grafische Vereinheitlichung (dev.639)

## Implementiert
- Einheitliche originale Pixelgrafik-Palette für zehn Möbelarten.
- Möbel-Sprites werden anhand der tatsächlichen Layout-Footprints gerendert und auf diese begrenzt.
- Eigenständige PC-Grafik statt Tisch-Ersatz; schmale Möbel zeichnen nicht mehr über ihre Kollision hinaus.
- Alle Innenräume verwenden denselben Renderer für verschiebbare Layoutmöbel.
- Neue Renderer-Unit-Tests.

## Grenzen / Freigabe
- Die gesamte Welt ist noch **kein** vollständig neu gezeichnetes Gen-5-Tileset. Gebäude, Natur und Figuren nutzen weiterhin vorhandene originale prozedurale Grafik.
- Hintergrunddekorationen und die separat gezeichneten interaktiven Gegenstände können weiterhin visuell überlagern.
- Manuelle Browserabnahme, visuelle Prüfung aller Karten und Grafikfreigabe stehen aus.
