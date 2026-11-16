# Phase 5 – dev.519: Abschluss der technischen Layoutintegration (Browserabnahme ausstehend)

## Fertiggestellt
- Datenbasierte Gebäudeplatzierung in Startdorf, Forschungsplatz und Beerendorf.
- Datenbasierte Möbelplatzierung im Schlafzimmer, Erdgeschoss und elf weiteren Innenräumen.
- Einheitliche Kollisions- und Portalaktualisierung für verschobene Gebäude.
- Alle Innenraum-Rückkehrportale werden vor jedem Layoutwechsel auf ihren Originalzustand zurückgesetzt, damit keine veralteten Koordinaten bleiben.
- Gespeicherte Layouts aus dev.500/501 werden um neue Karten ergänzt.
- Türen dürfen keine anderen Objekte schneiden; Story-Gebäude mit Türen sind vor versehentlichem Löschen geschützt.
- Zusätzliche Dekorationsobjekte werden aus dem Layout gezeichnet.

## Bekannte Grenzen
- Bereits fest in der Hintergrundgrafik gezeichnete Dekorationen sind nicht vollständig datenbasiert; sie bleiben sichtbar und werden nicht vom Editor verschoben.
- Neu hinzugefügte Gebäude sind zunächst reine Außengebäude ohne automatisch erzeugte Innenräume. Bestehende Gebäude mit Storyeingang bleiben erhalten.
- Es gibt keinen vollständig geprüften visuellen Browserabnahmetest. Der Nutzer sollte die Version vor endgültiger Freigabe testen.
