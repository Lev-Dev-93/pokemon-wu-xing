# Phase 13 – dev.680: Teamheilung und Wunschtraum

- Vitalglocke (215) und Aromakur (312) heilen aktive und Reserve-Pokémon, sofern ein Teamkontext vorhanden ist.
- Wunschtraum (273) wird teamseitig gespeichert und wirkt auch nach einem Wechsel auf das neu aktive Pokémon.
- Mehrfaches Aktivieren auf derselben Seite während eines aktiven Wunschs wird verhindert.
- `main.js` stellt für wilde und Trainerkämpfe den Teamkontext bereit.
- Vier neue Regressionstests; 916/916 Node-Tests bestanden.

## Einschränkungen
- Keine vollständige Browserabnahme durchgeführt.
- Erzwungene Wechsel, Wechselattacken und vollständiger Fähigkeitenkatalog weiterhin offen.
- Gegnerische Reserve-Pokémon benötigen einen expliziten `opponentTeam`-Kontext für teamweite Heilung.
- Phase 12 wurde nicht funktional verändert.
