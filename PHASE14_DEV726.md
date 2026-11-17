# Phase 14 – dev.726: Eigenständige Siedlungsarchitektur

- Neues Modul `src/settlement-identity-art.js` mit handgezeichneten, kachelgenauen Architekturdetails für Startdorf, Beerendorf, Professorenlichtung und Züchterhof.
- Verschiedene Dachziegel- und Farbpaletten pro Ort, eigenständige Hausgiebel und Fensterläden.
- Gebäudespezifische Silhouetten: Werkstatt mit Fachwerk und Emblem, Laden mit gestreifter Markise, Kapelle mit Rosettenfenster, Forschungsgebäude mit Oberlicht; überarbeitete Züchterhof-Scheune.
- Integration in `src/art.js`, ausschließlich als visuelle Überlagerung innerhalb der vorhandenen Gebäudegrundrisse.
- Keine neuen Fundgegenstände, Portale, Story- oder Kollisionsänderungen.
- 15 neue Regressionstests für Geometrie, Determinismus, Varianten und unveränderte Kollisionen. Manueller Browsertest offen.
