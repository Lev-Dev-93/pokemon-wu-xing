# Phase 13 – dev.667: Zweirundige Attacken

## Implementiert
- Solarstrahl kann nach dem Aufladen in der zweiten Runde auch dann ausgeführt werden, wenn der erste Zug den letzten AP verbraucht hat.
- Dies gilt für beide Kampfseiten und den gegnerischen Einzelzug nach Fangversuchen.
- Der Abschluss verbraucht keine weiteren AP; die im ersten Zug gespeicherte Attackenauswahl bleibt maßgeblich.
- Zwei neue Integrationstests für Spieler und Gegner; zwei ältere Quelltextmuster-Tests an die neue Validierung angepasst.

## Prüfung
- `npm test`: 830/830 erfolgreich.
- JavaScript-Syntax und ZIP-Integrität separat geprüft.
- Keine interaktive Browserabnahme in diesem Durchgang.

## Freigabe
Phase 13 **nicht vollständig freigegeben**. Insbesondere sind nicht alle Attackeneffekte/Fähigkeiten der importierten Daten implementiert (die Engine meldet dies bei nicht unterstützten Effekten), ein umfassender Regelabgleich sowie Browser-Kampftests stehen aus.
