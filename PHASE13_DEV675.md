# Phase 13 – dev.675: Eintrittsfallen und Feldbereinigung

## Implementiert
- Neues Modul `src/battle-hazards.js`: getrennte Fallen pro Teamseite.
- Stachler (191): bis zu drei Lagen, bodengebundener Eintrittsschaden (1/8, 1/6, 1/4).
- Giftspitzen (390): bis zu zwei Lagen; Vergiftung beim Einwechseln, Gift-Pokémon beseitigen die Lagen.
- Tarnsteine (446): Eintrittsschaden nach Gesteins-Typeneffektivität (1/8 × Faktor).
- Flug-Typ und Schwebe verhindern bodengebundene Eintrittseffekte.
- Turbodreher (229): entfernt eigene Fallen nach erfolgreichem Schaden und befreit von Egelsamen.
- Auflockern (432): entfernt Fallen beider Seiten und senkt den Ausweichwert.
- Einwechseln löst Fallen aus, einschließlich K.-o.-Behandlung.
- Zusätzliche Integrationstests für Auslegen, Stufenlimits, Immunitäten, Wechsel, Entfernung und K.-o.

## Prüfung
- `npm test`: 881/881 bestanden.
- JavaScript-Syntaxprüfungen durchgeführt; ZIP-Integrität geprüft.

## Bekannte Grenzen
- Giftspitzen-Stufe 2 erzeugt aktuell einfache Vergiftung; schwere Vergiftung und ihre steigenden Rundenkosten sind noch nicht modelliert.
- Auflockern ist vorläufig auf Fallen und Ausweichwert begrenzt; weitere Nebeneffekte fehlen.
- Turbodreher-Interaktion mit Blockaden/Geist-Immunität folgt der vorhandenen Schadenslogik; zusätzliche generationenspezifische Sonderfälle sind offen.
- Ein automatisierter Browsertest ist kein Ersatz für die weiterhin ausstehende interaktive Browser-Gesamtabnahme.
- Phase 13 ist noch nicht abgeschlossen; Phase 12 bleibt unverändert freigegeben.
