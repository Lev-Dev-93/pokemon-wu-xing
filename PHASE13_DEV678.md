# Phase 13 – dev.678: Systematische Inventur und komplexe Statusattacken

## Implementierung
- Krafttausch (384): Angriff und Spezial-Angriff tauschen ihre Kampfwertstufen.
- Statustausch (391): alle sieben Kampfwertstufen werden vertauscht.
- Leidteiler (220): aktuelle KP werden gemittelt, maximal bis zum jeweiligen KP-Maximum.
- Bauchtrommel (187): kostet die Hälfte der maximalen KP und setzt Angriff auf +6; schlägt bei zu wenig KP oder bereits maximalem Angriff fehl.
- Sechs gezielte neue Regressionstests.

## Vollständigkeitsinventur
- `scripts/phase13-inventory.mjs` erzeugt einen reproduzierbaren Vergleich des Attackenkatalogs mit Lernlisten und statischen Kampfcode-Referenzen.
- `PHASE13_KATALOG_AUDIT_DEV678.md` und `PHASE13_MOVE_INVENTORY_DEV678.json` dokumentieren Zahlen und eine konservative Verdachtsliste.
- Statische Referenzen sind ausdrücklich **kein** Funktionsnachweis; die Verdachtsliste kann Fehlklassifikationen enthalten.

## Nächste große Arbeitspakete
1. Statusattacken mit fehlender Effektbehandlung gruppiert implementieren und pro Mechanik testen.
2. Komplexe Schadensattacken und Wechselattacken inklusive erzwungenem Wechsel und Gegner-Teamkontext.
3. Fähigkeiteninventur nach tatsächlich spielbaren Spezies mit Interaktionsmatrix und Regressionstests.
4. Browser-End-to-End-Abnahme kompletter Kampfabläufe und Rückkehr in die Spielwelt.

## Abnahme
- 902/902 Node-Tests bestanden; JavaScript-Syntax geprüft.
- Keine vollständige Browser-Gesamtabnahme; Phase 13 bleibt offen.
- Phase 12 unverändert.
