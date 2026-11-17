# Phase 16 – dev.780: Spieler-PC im Schlafzimmer

- Pokémon-PC-Interaktionsobjekt von Erdgeschoss nach Schlafzimmer (7,2) versetzt.
- Standardlayout enthält den geschützten PC nun im Schlafzimmer; alte Layout-JSONs werden beim Laden automatisch migriert.
- PC-Lagerzugriff ist an das Schlafzimmer gebunden, die Freischaltung nach dem Schlüpfen bleibt erhalten.
- Neues Original-PNG `assets/tilesets/bedroom_pc_32.png` mit Renderer und Canvas-Fallback.
- Neuer Pixelart-Konzeptentwurf `assets/tilesets/bedroom_pc_concept.png`, noch kein direkt verwendbares Spiel-Tileset.
- Menütexte aktualisiert; Scheune bleibt Dekoration ohne Innenraum oder Portal.
- Bestehende PC-Tests aktualisiert und neue Regressionstests für Raumzuordnung und Migration ergänzt.
- Visuelle Browserprüfung ausstehend.
