# Pokémon-Grundlagen: Entwicklungsstatus dev.252

**Nicht vollständig abgeschlossen.** Die bestehenden automatisierten Tests decken nur einen Teil des Spiels ab.

## Bereits als technische Grundlage vorhanden
- Pokémon-Daten und Teamverwaltung einschließlich ausgewählter späterer Entwicklungen und Regionalformen
- Kampfrunden, Attacken, Typeneffektivität, Status, Wetter, Wechsel, Erfahrung und Fangsystem (jeweils mit bisher implementiertem Umfang)
- Fähigkeitsinventur und zentrale Hilfsfunktionen für ausgewählte Fähigkeitsgruppen
- Spielwelt, Prolog, Karten, Interaktionen, Inventar und Speichern/Laden

## Wesentliche offene Punkte
- Alle im zugelassenen Pokémon-Pool vorkommenden Fähigkeiten vollständig mit Triggern, Sonderfällen und Tests umsetzen; die Inventur ist kein Vollständigkeitsnachweis
- Vollständige Attackenabdeckung aller zugelassenen Pokémon, einschließlich Sonderwirkungen, Zielauswahl und Mehrfachtreffer-Sonderfällen prüfen
- Status-, Wechsel-, Wetter- und Kampfeffekt-Kombinationen systematisch mit Integrationstests abdecken
- Entwicklungsbedingungen, Regionalformen und Datensätze aller zugelassenen Arten auf Vollständigkeit prüfen
- Items, getragene Items, Kampf-Items, Fähigkeiteninteraktionen und weitere Sondermechaniken prüfen
- Browser-End-to-End-Tests, Spielbalance, Storyfortschritt, Karten-/Kollisions- und Speichermigrationstests durchführen
- Vollständige Abdeckungsmatrix pro Fähigkeit/Attacke/Pokémon mit nachgewiesenem Status erstellen

**Hinweis:** Das Bestehen der Tests bestätigt die geprüften Fälle, nicht die Vollständigkeit der Pokémon-Spielgrundlagen.
