# Phase 16 – dev.771: Mehrkachel-Grafiken

- `assets/tilesets/yard_trees_64.png`: zwei eigenständige, transparente Baumvarianten (64×64 px).
- `assets/tilesets/yard_pond_3x2.png`: durchgehende 96×64-Pixel-Teichgrafik mit Rand und Wasserreflexen.
- `assets/tilesets/yard_path_edges_32.png`: 16 Wegkanten-Varianten mit Bitmasken.
- `src/yard-sprite-assets.js`: Lade- und Zeichenfunktionen für die neuen Assets.
- `src/art.js`: Teich und Bäume im Züchterhof eingebunden, Wegkanten an den Wegen ergänzt.
- Alte Grafik als Fallback für nicht geladene PNGs; keine Änderungen an Kollisionen, Portalen oder Story.
- Automatisierte Node-Tests; ein manueller Browsertest ist noch erforderlich.
