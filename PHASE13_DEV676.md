# Phase 13 – dev.676: Schwere Vergiftung

- Toxin (Attacke 92) erzeugt eine eskalierende Vergiftung. Der Schaden beginnt mit 1/16 der maximalen KP und steigt je Runde um weitere 1/16 bis 15/16.
- Zwei Schichten Giftspitzen erzeugen beim geerdeten, nicht immunen Pokémon schwere Vergiftung; eine Schicht erzeugt normale Vergiftung.
- Normale Vergiftung behält ihre bisherige Rundenschadensregel (1/8 der maximalen KP).
- Beim Wechsel wird die Eskalation zurückgesetzt, das Statusproblem bleibt bestehen.
- Statusheilung setzt den Zähler zurück.
- Fünf neue Regressionstests, insgesamt 886/886 Node-Tests erfolgreich.

## Offene Punkte
- Keine vollständige Attacken- und Fähigkeitenabdeckung.
- Wechselattacken und erzwungene Gegnerwechsel nicht vollständig implementiert.
- Browser-Gesamtabnahme noch offen; Node-Tests sind keine Browserabnahme.
- Phase 12 unverändert.
