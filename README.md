# Pokémon Wu Xing – 1.0.0-dev.3

Grafikpaket **Das Zuhause**. Technischer Prototyp für GitHub Pages. Vollständiges ZIP entpacken und **den Inhalt** direkt in das Repository `pokemon-wu-xing` hochladen; `index.html` muss im Root liegen. GitHub Pages: `main` → `/ (root)`.

## Inhalt

- Schlafzimmer mit Holzdielen, Bett, Schreibtisch, Schrank, Teppich, Fenster und Tür
- Obergeschoss mit Teppich, Sitzbereich, Schrank, Pflanzen und Treppe
- Erdgeschoss mit Küche/Anrichte, Wohnmöbeln und Treppe
- Züchterhof mit Hausfassade, Wegen, Beeten, Zaun und markierter Höhentreppe
- überarbeitete Benutzeroberfläche, einheitlicher Spielname, eigene 32-Pixel-Figurenzeichnung

## Bedienung

Pfeiltasten oder WASD bewegen die Figur; optional die Bildschirm-Pfeiltasten. Speichern/Laden über die Schaltflächen. Unter **Technische Informationen** stehen Kartenkoordinaten und Schrittzahl. Bestehende Spielstände aus `monsterreise-dev1` werden beim Laden als Fallback berücksichtigt.

## Lokal ausführen

Mit Python 3: `python3 -m http.server 8000`, dann `http://localhost:8000/` öffnen. Mit Node.js 20+: `npm test`. Keine Abhängigkeiten und kein Build-Schritt.

## Wichtig

Die 32×32-Grafiken sind selbst im Quellcode `src/art.js` gezeichnet. Sie sind noch **nicht** die endgültigen Pixelassets. Diese Version fügt keine kanonischen Storyereignisse oder Pokémon-Daten hinzu. Die Engine-Karten und ihre Kollisionen bleiben gegenüber dev.2 unverändert. Browser- und visuelle Prüfungen sind im TESTREPORT getrennt dokumentiert.
