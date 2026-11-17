# Phase 14 – dev.710: Konfigurierbare NPC-Tagesabläufe

## Änderungen
- `src/npc-patrol.js`: optionale, deterministische NPC-Zeitfenster mit `scheduleCycle`, `schedule` und `patrolEvery`.
- Zeitfenster unterstützen `idle` und `patrol`, einschließlich Validierung gegen Überlappungen, ungültige Richtungen und fehlerhafte Grenzen.
- Zeitgeber zählt erfolgreiche Spielerschritte; keine Abhängigkeit von Systemzeit oder Browser-Timern.
- Vorhandene NPCs erhalten **keine** Tagesabläufe; die Funktion ist für zukünftige, ausdrücklich konfigurierte Nebenfiguren vorbereitet.
- `tests/npc-schedules-dev710.test.mjs`: sieben Regressionstests.

## Teststatus
- `npm test`: 1106 bestanden, 0 fehlgeschlagen.
- Browser-End-to-End: auf Wunsch verschoben.

## Unverändert
Story, Kartenlayouts, bestehende NPC-Startpositionen, Grafiken und Fundgegenstände.

## Konfigurationsbeispiel (nur Dokumentation)
```js
{
  id:'extra', x:1, y:1, scheduleCycle:24, patrolEvery:2,
  schedule:[
    {from:0,to:8,activity:'idle'},
    {from:8,to:18,activity:'patrol',path:['right','down','left','up']},
    {from:18,to:24,activity:'idle'}
  ]
}
```
