# Phase 13 – dev.702: GitHub-Pages-Browserprüfung

## Implementiert
- `phase13-browser-test.html`: separat erreichbare, responsive Testseite für GitHub Pages.
- `src/phase13-browser-checks.js`: sechs echte, deterministische Kampfszenarien ohne Änderung an Savegame oder Welt.
- Automatisches Testergebnis je Szenario mit Fehlermeldung und Gesamtstatus.
- Manuelle Checkliste für Spielstand, Trainerkampf, wilde Begegnung, Fang, Wechsel, Items und Rückkehr zur Welt.
- Zwei neue Node-Regressionstests; 1066/1066 erfolgreich.
- Versionsanzeige in der Hauptseite aktualisiert; veraltete Versionsobergrenze im Regressionstest erweitert.

## Browserstatus und Freigabe
- Lokaler Chromium-Headless-Aufruf auf die neue Prüfseite wurde versucht, endete aber mit Timeout und ohne DOM-Ausgabe. **Browserprüfung nicht bestanden oder widerlegt, sondern nicht verifizierbar.**
- Phase 13 ist **nicht vollständig fachlich freigegeben**. Die Kataloginventur `PHASE13_KATALOG_AUDIT_DEV678.md` zeigt 577 Attacken im Katalog und 88 damals nicht per einfacher ID-Referenz zugeordnete Statusattacken. Diese Zahl ist kein Nachweis fehlender Implementierungen, aber ein konkreter Prüfauftrag.
- End-to-End-Prüfungen für Fang, Trainerkämpfe, Wechsel, Items und Speicherstände sind noch manuell im echten Browser durchzuführen.
- Die Testseite ist ein Einstieg in die Browserabnahme, keine vollständige Simulation des Spiels.

## GitHub Pages
1. ZIP-Inhalt in das Repository hochladen und GitHub Pages bereitstellen.
2. `https://<account>.github.io/<repository>/phase13-browser-test.html` öffnen.
3. Auf **Browser-Kampftests ausführen** klicken und Ergebnisse notieren.
4. Über **eigentliches Spiel** zur Hauptseite wechseln und die manuelle Checkliste durchführen.

Keine Karten, Storyereignisse oder Fundgegenstandspositionen geändert.
