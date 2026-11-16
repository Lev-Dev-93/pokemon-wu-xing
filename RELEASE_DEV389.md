# Pokémon Wu Xing 1.0.0-dev.389

Basis: dev.384. Entwicklungsblock dev.385–389 (Kampfoberfläche).

## Umsetzung
- KP-Zustände, typbasierte Attackenmarkierung, Trefferanimation, Arena-Hintergrund und Präsentationsphasen.
- Kampflogik, Teamzustand und Story-Tutorial bleiben unverändert.

## Prüfungen
- `node --check src/main.js`: erfolgreich.
- `npm test`: 708 bestanden, 0 fehlgeschlagen.
- ZIP-Integrität geprüft.
- Visuelle Browserabnahme und Browser-E2E in dieser Ausführung nicht durchgeführt.

## Bekannte Grenzen
- Pokémon werden weiterhin mit den bestehenden Platzhalter-Kampfsprites angezeigt.
- Es wurden keine neuen artspezifischen Attackenanimationen hinzugefügt.
