# Phase 13 – dev.693: Getragene Kampfitems (erster Integrationsblock)

- Optionales `heldItemId` im Pokémon-Datensatz; ältere Spielstände ohne dieses Feld bleiben gültig.
- Drei explizit unterstützte Projekt-Itemschlüssel: `muscle-band` (Muskelband, +10 % physischer Schaden), `wise-glasses` (Schlauglas, +10 % Spezialschaden), `expert-belt` (Expertengurt, +20 % bei sehr effektivem Schaden).
- Modifikatoren werden in der echten Schadensberechnung nach der Typprüfung angewandt; keine Wirkung bei Statusattacken.
- Ungültige Itemschlüssel werden beim Erstellen und Validieren abgelehnt.
- Keine automatische Vergabe, Ausrüstung im Inventar oder UI implementiert. Keine pauschale Unterstützung aller getragenen Items behauptet.
- Automatisierte Tests inklusive Kampfintegration ergänzt. Interaktive Browserabnahme bleibt offen.
- Phase 12 nicht gezielt geändert; Phase 13 weiterhin offen.
