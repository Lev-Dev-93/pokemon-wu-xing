# Phase 13 – dev.671: größerer Attacken- und Fähigkeitenblock

## Implementiert
- Zusätzliche Kampfstufen-Attacken (unter anderem Drachentanz, Hausbruch, Falterreigen, Gedankengut, Ränkeschmied, Eisenabwehr, Fadenschuss, Grimasse, Daunenreigen, Gangwechsel, Klauenwetzer).
- Zusätzliche Statusattacken: Schlafpuder, Gesang, Pilzspore, Todeskuss, Irrlicht und Bitterkuss (Verwirrung).
- Erholung: volle KP und Schlaf; Dunkelnebel: alle Kampfstufen zurücksetzen.
- Mondschein und Ruheort als KP-Heilung (vereinfachte Implementierung; Ruheort verändert den Flugtyp nicht vorübergehend).
- Fähigkeit Aufheber: Heilung statt Giftschaden am Rundenende.
- Acht neue automatisierte Regressionstests.

## Prüfung
- `npm test`: 851/851 erfolgreich.
- `node --check src/battle.js`: erfolgreich.
- Chromium-Headless-Smoke-Test: Zeitüberschreitung, **keine Browserfreigabe**.

## Einschränkungen
Phase 13 ist weiterhin nicht vollständig: insbesondere fehlen weitere komplexe Attackeneffekte, vollständige Fähigkeitensemantik (Inventur: 169 Fähigkeits-IDs), Datenabgleich, Spielstandmigration und vollständige interaktive Browser-E2E-Abnahme. Die Implementierung enthält bewusst vereinfachte Mechaniken. Phase 12 bleibt freigegeben.
