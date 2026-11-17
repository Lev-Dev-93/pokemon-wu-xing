# Phase 14 – dev.725: Bodenvegetation in den Siedlungen

- Neues Modul `src/outdoor-ground-art.js`: deterministische, handgezeichnete 32px-Bodendetails für Züchterhof, Beerendorf und Startdorf.
- Kleine Blüten, Grasbüschel, Kiesel und Blätter sorgen für erkennbar abwechslungsreichere Außenflächen.
- Integration in `src/art.js` vor Gebäuden und Figuren, ohne Änderung von Weltgeometrie oder Spiellogik.
- Wege, blockierte Zellen und Portale bleiben vollständig frei; alle Pixel bleiben in ihrer Kachel.
- Sieben neue automatisierte Tests; manueller Browsertest offen.
