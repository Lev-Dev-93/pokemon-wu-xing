# Architektur – Pokémon Wu Xing 1.0.0-dev.3

- `src/maps.js`: Karten-IDs, 32×32-Tile-Koordinaten, Kollision, Höhenfelder, Portale.
- `src/engine.js`: deterministische Bewegung, Portale, Zustands-Speicherung und Validierung. Unverändert aus dev.2.
- `src/art.js`: rein lesender, datengetriebener Canvas-Renderer, vier individuell gestaltete Testkarten. Alle Grafikprimitiven sind eigene Pixelzeichnungen, keine importierten Pokémon-Sprites. Das Layout nutzt feste Kartenkoordinaten und verändert keine Kollisionsdaten.
- `src/main.js`: zentrale Eingabe, UI und requestAnimationFrame, Speichern/Laden über localStorage; alte Speicherstände werden unterstützt.
- `index.html`: responsive Benutzeroberfläche mit einklappbaren technischen Informationen.

## ADR-003: Grafik-Meilenstein

Für die grafische Vorabversion verwenden wir programmatisch gezeichnete 32×32-Tiles, ohne externe Bilddateien. Das ermöglicht klare Kollision-/Grafikzuordnung, unmittelbare Browserdarstellung und konsistente eigene Pixelgrafik. Die endgültige visuelle Produktionspipeline kann später auf echte Tileset-PNGs wechseln, ohne die Engine zu ersetzen.

## Bekannte Grenzen

Die Architektur bleibt bewusst eine frühe vertikale Scheibe: keine Kamera, keine Dialoge, keine NPCs, kein Kampf, kein Menüsystem. Die aktuelle Bewegung ist rasterbasiert, die Spielfigur besitzt noch keine zeitbasierte flüssige Geh-Animation. Portale verwenden aktuell Koordinaten, statt der später vorgesehenen expliziten Spawn-Anker-IDs. Dies wird vor großen Karten und Storysequenzen ausgebaut.
