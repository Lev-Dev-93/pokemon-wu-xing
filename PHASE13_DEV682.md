# Phase 13 – dev.682: Auflösung gegnerischer Wechselaufträge

## Implementiert
- Neuer Resolver `src/battle-pending-switch.js` für gegnerische erzwungene Wechsel und Pivot-Wechsel.
- Ersetzt aktives gegnerisches Pokémon durch eine kampffähige Reserve und übernimmt auswechselbare Pokémon zurück in die Reserve.
- Setzt temporäre Kampfstufen zurück; übernimmt Team-Schutzfelder; wendet Eintrittsfallen und Eintrittsfähigkeiten an.
- Gegnerreserve aus Trainerkämpfen ist in `main.js` angebunden; Spielerwechselaufträge öffnen die vorhandene Wechselwahl.
- Ohne kampffähige Reserve wird der Auftrag verworfen, statt den Kampf dauerhaft anzuhalten.
- Fünf neue Regressionstests; 926/926 Node-Tests bestanden.

## Noch offen
- Exakte Zugfortsetzung nach Wechselattacken: aktuell wird der unterbrochene Zug nicht vollständig fortgesetzt.
- Trainer-KI für gezielte Ersatzwahl, K.O.-Ketten durch Eintrittsfallen und vollständige Browserabnahme.
- Phase 13 nicht freigegeben; Phase 12 unverändert.
