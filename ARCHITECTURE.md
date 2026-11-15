# Architektur / ADR-001
Entscheidung 15.11.2026: native ES-Module, HTML5 Canvas, 32 Pixel pro Tile, reine 2D-Karten, keine Laufzeitbibliotheken. Grund: kleine, transparente, auf GitHub Pages direkt ausführbare Basis. Spätere Umstellung auf TypeScript bleibt möglich, ist nicht beschlossen.

`src/maps.js`: datenbasierte Karte, Portal-, Kollisions- und Höhenregeln. `src/engine.js`: deterministische Spielzustandsübergänge, Speicherformat. `src/main.js`: Eingabe und Darstellung. Der Renderer ändert keine Spielregeln. Ein einziger Input-Verantwortlicher, keine Kartenlistener. Aktuelle Bewegung ist rasterbasiert, nicht interpoliert. Rückkehranker werden gespeichert; derzeit führen explizite Gegenportale zu den jeweiligen Türen. Höhenwechsel nur an markierten Stufen. Kartenlayouts sind technische Testdaten, keine Storyentscheidung.

Nächste technische Arbeit: feste Update-Schrittweite statt vorläufigem Eingabeintervall, Animation, Portal-Validierung einschließlich Softlock-/Triggerprüfung, mehrstufige Höhenkanten und vollständige Browser-E2E-Suite.
