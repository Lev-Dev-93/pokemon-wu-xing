# Fähigkeitsinventur (dev.237)

Quelle: vorhandene Spiel-Pokémon-Daten und Erweiterungsregister; inklusive versteckter Fähigkeiten und Regionalformen.

- Untersuchte Pokémon-/Formdatensätze: 508
- Eindeutige Fähigkeits-IDs: 169
- Teilweise im Kampfcode erkennbar: 41
- Nicht als implementiert verifiziert: 128
- Vollständig nachgewiesen: **0** (bewusst konservative Einstufung)

**Wichtig:** `partial` heißt nur, dass der Code die Fähigkeit behandelt; die komplette Mechanik ist nicht bewiesen. `unverified` heißt nicht zwingend fehlend. Der Bericht ist eine erste technische Inventur, keine vollständige semantische Codeanalyse.

Datenquelle: `src/ability-inventory.json`; lesbare API: `src/ability-audit.js`.
