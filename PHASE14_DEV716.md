# Phase 14 – dev.716: NPC-Speicherstände

- Schema 9 speichert NPC-Takt und Laufpositionen je Karte.
- Beim Laden werden nur bekannte NPC-IDs, gültige Koordinaten und Blickrichtungen übernommen; fremde Daten werden abgelehnt.
- Ältere Spielstände bleiben kompatibel und beginnen mit statischen NPCs.
- Neustart setzt NPC-Laufzustände zurück.
- Story, Karten und Fundgegenstände unverändert.
- Manueller Browsertest noch ausstehend.
