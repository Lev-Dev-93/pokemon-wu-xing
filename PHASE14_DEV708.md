# Phase 14 – dev.708: Interaktionssicherheit

## Implementierung
- `src/interaction-targets.js`: deterministische, seiteneffektfreie Zielauswahl für NPCs und Objekte; NPCs haben Vorrang, wenn Altdaten eine Kachel doppelt belegen.
- `Engine.interact()` nutzt die zentrale Zielauswahl, statt NPC- und Objektlisten zu kopieren und zusammenzuführen.
- `auditWorld()` meldet zusätzlich doppelt belegte NPC-/Objekt-Interaktionsfelder und ungültige Actor-Koordinaten.
- Sieben Regressionstests einschließlich einer Prüfung aller vorhandenen Karten.

## Abgrenzung
Keine Änderungen an Kartenpositionen, Story, Grafik, Gegenständen oder NPC-Dialogen. Kein Browser-End-to-End-Test in dieser Entwicklungsrunde; die automatisierte Testsuite ist keine Browserabnahme.
