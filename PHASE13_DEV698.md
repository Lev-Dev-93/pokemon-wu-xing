# Phase 13 – dev.698: Fundgegenstände als optionale Mechanik

- Neue Datei `src/world-pickups.js` mit leerem `WORLD_PICKUPS`-Register. **Keine Fundgegenstände auf bestehenden Karten platziert.**
- Definitionen für später: `id`, `mapId`, `x`, `y`, `itemId`, `quantity`.
- Validierung: nur bekannte getragene Kampfitems, freie begehbare Kacheln, keine Portale, Ankunftsflächen, NPCs, vorhandenen Objekte, doppelten IDs oder Positionen.
- `Engine.collectGroundPickup(x,y,registry)` ermöglicht einmaliges Einsammeln per Interaktion von benachbarten Feldern, mit atomarer Inventarübergabe und Event-Protokoll.
- Gesammelte IDs werden unter `state.collectedPickups` gespeichert; alte Spielstände erhalten ein leeres Register; fehlerhafte Register werden abgewiesen.
- 10 neue automatisierte Tests; 1053/1053 erfolgreich.
- Noch offen: grafische Darstellung, tatsächliche Kartenplatzierungen und vollständige interaktive Browserabnahme. Platzierungen erfolgen erst nach ausdrücklicher Freigabe.
