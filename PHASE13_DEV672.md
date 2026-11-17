# Phase 13 – dev.672: Schutzfelder und Kampfzielregeln

## Umsetzung
- Reflektor (115) reduziert physischen Schaden für fünf Runden; Lichtschild (113) reduziert speziellen Schaden für fünf Runden. Die Felder wirken pro aktivem Kämpfer und werden am Rundenende heruntergezählt.
- Bodyguard (219) verhindert neue primäre Statusprobleme; Weißnebel (54) verhindert gegnerische Statuswertsenkungen durch unterstützte Attacken und Zusatzeffekte.
- Eigene Feldattacken sowie eigene Verstärkungen, Heilung und Wetter werden nicht mehr durch den gegnerischen Schutzschild blockiert und müssen keine gegnerische Genauigkeitsprüfung bestehen.
- Die vier Feldwirkungen werden als Kampfzustand geführt; keine Veränderung des gespeicherten Pokémon-Grunddatensatzes.

## Qualitätssicherung
- `npm test`: 856 von 856 Tests erfolgreich (5 neue Regressionstests).
- `node --check src/battle.js` erfolgreich.
- ZIP-Integrität geprüft.

## Offene Punkte
- Kein erfolgreicher vollständiger Browser-End-to-End-Test für dev.672.
- Mehrfachkämpfe, vollständige Fähigkeitensemantik, Datenabgleich aller Attacken und langfristige Status-/Spielstandmigration sind nicht vollständig abgenommen.
- Die Schutzfelder sind derzeit pro aktivem Kämpfer modelliert; Team-seitige Persistenz über Pokémon-Wechsel muss vor vollständiger Phase-13-Freigabe ergänzt werden.
- Phase 13 ist **nicht vollständig abgeschlossen**. Phase 12 bleibt freigegeben.
