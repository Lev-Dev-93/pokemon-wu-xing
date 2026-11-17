# Phase 14 – dev.707: Mehrfachblock Welt-Sicherheit

## Umgesetzt
1. **Portalsicherheit:** Neue Prüfung für doppelt belegte Portalquellfelder und NPC-blockierte Ankunftsfelder (`validatePortalSafety`).
2. **NPC-Kollisionen:** `validateActors` erkennt nun zusätzlich überlappende NPC-Startpositionen.
3. **Defensive Kartenprüfung:** `validatePortalDestinations` verwirft fehlende/ungültige Zielkartengrößen; `reachableMaps` traversiert nur tatsächlich vorhandene Karten, auch bei fehlerhaften Portaldaten.
4. **Regressionen:** Sechs neue Tests für alle Änderungen sowie die bestehenden Weltkarten.

Keine Änderungen an Story, Kartenlayouts, Grafiken oder Fundgegenständen. Browser-End-to-End nicht durchgeführt; eine spätere gemeinsame Browserabnahme bleibt nötig.
