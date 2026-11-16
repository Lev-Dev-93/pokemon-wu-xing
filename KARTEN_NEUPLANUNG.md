# Karten-Neuplanung – dev.312

Die sieben Außenkarten und der Züchterhof sind in einer gemeinsamen Überarbeitung neu abgestimmt worden. Die Übersicht `KARTENUEBERSICHT.png` zeigt die tatsächlichen Kachelkoordinaten aus dem Programm (vereinfachte technische Ansicht, kein Screenshot des laufenden Spiels).

- Mu: vier Gebäude auf spiegelnden Grundstücken, Nord-Süd-Mittelachse und West-Ost-Hauptstraße; Hauszugänge führen zu Nebenwegen.
- Forschungsplatz: Labor und Professorenhaus in einer geordneten oberen Reihe; direkte Zufahrten.
- Beerendorf: vier Gebäude in zwei Reihen, spiegelnde Randbepflanzung, Ost-West-Straße und kurze Haustüranschlüsse.
- Route 1: zusammenhängender Ost-West-Weg, südliche Abzweigung und symmetrische Hindernisse.
- Bachübergang: durchgehende Brücke und Südweg.
- Waldrand: Nord-Süd-Weg mit östlichem Ausgang und paarweisen Baumgruppen.
- Alter Wald: Ost-West-Weg, Hüttenanschluss und spiegelnde Waldgruppen.
- Züchterhof: bestehende Weide, Teich und Höhenstufen bleiben wegen ihrer Spielmechanik erhalten.

**Konsistenz:** Gebäude, Wege, Bäume, Büsche, Türen und Portale teilen sich Kachelkoordinaten zwischen Darstellung und Kollision. Wilde Begegnungen bleiben auf Wegen ausgeschlossen. Die kanonische geografische Reihenfolge und die Geschichte bleiben erhalten.

**Prüfung:** 625/625 automatisierte Tests bestanden. Kein interaktiver Browser-Durchlauf.
