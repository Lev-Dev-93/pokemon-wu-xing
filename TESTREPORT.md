# Testbericht – 1.0.0-dev.1
Datum: 15.11.2026

## Automatisierte Tests
`npm test`: 6/6 bestanden (Node 22). Start/Kollision, Schlafzimmertür/Rückweg, Etagenwechsel/Rückweg, Hoftür/Rückweg, Höhenkollision, Save/Load.

## Browser
Chromium-Headless-Aufruf versucht, jedoch im Ausführungsumfeld wegen Zeitüberschreitung ohne verwertbares DOM-Ergebnis abgebrochen. **Browser-End-to-End nicht bestanden oder nachgewiesen**. Visuelle Screenshotprüfung nicht durchgeführt. Daher **keine Release-Freigabe als vollständig browsergeprüfter Meilenstein**.

## Offen
Reale Tastatureingaben, Fokus, Rückkehrpunkte bei mehreren Türen, Höhen-Sonderfälle, Speichermigration, Screenshot-/Browser-E2E, feste Update-GameLoop, Sprite-Animation, kanonische Karten, Storyevents. Aktuelle Rückkehrposition wird über explizite Gegenportale und gespeicherte Anker realisiert; dynamische Rückkehranker noch nicht vollständig umgesetzt.
