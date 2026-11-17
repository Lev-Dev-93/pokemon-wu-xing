# Phase 14 – dev.728: Vegetation und Landschaftsübergänge

- Neues Modul `src/landscape-transition-art.js` für deterministische, ortsabhängige Vegetation auf freien Graskacheln unmittelbar neben Wegen.
- Grasfransen an Wegrändern sowie punktuelle Blüten-/Blattgruppen an Übergängen; individuelle Farbpaletten für Startdorf, Beerendorf, Professorenlichtung und Züchterhof.
- Integration in `src/art.js` nach Wegegestaltung, vor Landschaftsdetails; nur Darstellung, keine Karten- oder Speicherstandsänderung.
- Acht neue Tests zu Determinismus, Begrenzung auf Graskacheln, Portalschutz, Kartenintegrität, Züchterhofpfad und Ortsfarben.
- `npm test`: 1.210/1.210 bestanden. Manueller Browsertest ausstehend.
