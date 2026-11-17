# Phase 13 – dev.668: Erweiterung der Schadensfähigkeiten

## Implementiert
- Notdünger (65), Großbrand (66), Sturzbach (67), Hexaplaga (68): 1,5-facher Schaden für den passenden Typ bei maximal einem Drittel verbleibender KP.
- Anpassung (91): STAB steigt auf 2,0 statt 1,5.
- Aufwertung (110): nicht sehr effektive Attacken werden verdoppelt; Immunitäten bleiben erhalten.
- Filter (111) und Felskern (116): sehr effektive Treffer werden auf 75 % reduziert.
- Multischuppe (136): Schaden bei vollen KP halbiert.
- Die Modifikatoren sind in die tatsächliche Schadensberechnung von `src/battle.js` integriert.
- Fünf neue Tests inklusive Kampfintegration.

## Prüfung
- `npm test`: 835/835 bestanden.
- JavaScript-Syntax und Paketintegrität separat geprüft.
- Keine interaktive Browserabnahme durchgeführt.

## Grenzen
- Das ist ein größerer zusammenhängender Fähigkeitenblock, aber **nicht die vollständige Implementierung sämtlicher Fähigkeiten und Attackeneffekte**. Phase 13 bleibt offen.
