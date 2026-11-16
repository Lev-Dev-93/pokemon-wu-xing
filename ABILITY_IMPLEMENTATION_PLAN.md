# Implementierungsplan Fähigkeiten

1. Pro Fähigkeits-ID alle Auslöser, Einschränkungen und Kampfphasen dokumentieren; PokeAPI-IDs allein beweisen keine Wirkung.
2. Zentrale Hook-Schnittstellen für `onEntry`, `onSwitchOut`, `beforeMove`, `onHit`, `onStatus`, `onTurnEnd` entwerfen, ohne bestehende Battle-API zu brechen.
3. Zunächst passive Typ- und Statusimmunitäten migrieren; dann Wetter und Wechsel; anschließend Schadensmodifikatoren und spezielle Ausnahmen.
4. Für jede Fähigkeit positive, negative und Grenzfall-Tests anlegen, einschließlich versteckter Fähigkeiten und Regionalformen.
5. Erst nach bestandenen Tests und semantischer Prüfung Status `complete` setzen.

Noch nicht umgesetzt: eine neue Hook-Engine oder alle fehlenden Fähigkeiten. Diese Entwicklungsrunde ist eine nachvollziehbare Bestandsaufnahme und Testgrundlage.
