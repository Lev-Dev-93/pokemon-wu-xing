# Einheitliches Fähigkeitensystem – Stand dev.247

Die Einwechsel-Fähigkeiten und die Typabsorption verwenden gemeinsame, seiteneffektfreie Abfragen in `src/ability-effects.js`. Die tatsächlichen Kampfeffekte bleiben in `battle-entry.js` und `battle.js`.

**Noch nicht vollständig zentralisiert:** alle Schadensmodifikatoren, sonstige Fähigkeiten, Sonderfälle für Mehrfachkämpfe und Fähigkeitenunterdrückung. Die vollständige Fähigkeitsabdeckung ist weiterhin offen.

Prüfung: automatisierte Node-Tests und JavaScript-Syntax; keine manuelle Browserprüfung.
