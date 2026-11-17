# Phase 16 – dev.768: Detail-Pass für native PNG-Sprites

- Originale PNG-Assets für Wohnhaus und Scheune neu gezeichnet: Dachziegel, Traufe, Fensterrahmen, Holzleisten und Schatten.
- Terrain-Atlas (32×32 Pixel pro Zelle) mit feineren Grashalmen und ruhigerer Erdwegtextur neu erstellt.
- Pflanzen-Atlas mit Blüten- und Beerenbuschvarianten überarbeitet.
- Render-Korrektur: Bei erfolgreich geladenem Terrain-PNG werden die alten Canvas-Wege nicht erneut darüber gezeichnet.
- Vier zusätzliche Regressionstests für Atlasabmessungen und Renderreihenfolge.

## Einschränkungen
Die Assets sind ein verbesserter handgezeichneter Pixel-Prototyp, noch keine fertig ausgereifte Gen-5-Grafik. Gebäude-Kollisionen, Story und Karte bleiben unverändert. Visuelle Browserabnahme steht aus.
