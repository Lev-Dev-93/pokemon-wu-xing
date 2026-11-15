## dev.21 – Professor-Ausflug und schillerndes Raupy

- Freiwilliges Gespräch mit dem Professor nach Absol startet eine einmalige, mehrteilige Forschungsexkursion.
- Schillerndes Raupy mit provisorischer Canvas-Grafik, erklärtem Seltenheitsmerkmal, inszenierter Kampfdemonstration und Fang.
- Abschluss setzt `professor_demo`, speichert automatisch und ergänzt das Tagebuch.
- Das Starter-Ei bleibt ungeschlüpft; Route 1 folgt später.
- Die Kampfdemonstration ist derzeit eine geskriptete Sequenz, kein vollwertiger NPC-Kampf.

# Pokémon Wu Xing – 1.0.0-dev.17

Statische Browser-Testversion für GitHub Pages. Lade **alle Dateien und Ordner aus diesem ZIP** in das Hauptverzeichnis deines Repositories; `index.html` liegt im Root.

## Steuerung
WASD/Pfeiltasten: Bewegung; E/Leertaste: Interaktion; M: Menü; J: Tagebuch.

## Neuer Testweg
Schlafzimmer → Erdgeschoss → Züchterhof. Vom Züchterhof den Mittelweg nach **Süden** bis zum unteren Kartenrand gehen: Startdorf Mu. Der Weg **nach Norden** führt zurück zum Hof. Dorfbewohnerin, Kindheitsfreund und Professor sind ansprechbar. Die Figuren sind derzeit technische Platzhalter, ihre Dialoge keine endgültigen Storytexte.

## Tests
`npm test` (Node.js 20+), lokal `python3 -m http.server 8000`, dann `http://localhost:8000`. GitHub Pages benötigt keine Installation. Siehe TESTREPORT.md.

## Wichtig
Der Geburtstag und die Starterauswahl bleiben erhalten. Das Ei schlüpft **nicht** im Dorf. Die Route 1 existiert noch nicht.


**dev.17:** Dorfhaus links und Arbeitszimmer rechts über die markierten Eingänge im Startdorf betretbar.

## dev.18 Zwischenstand
Die Story-Ereignisse werden in `src/story-events.js` mit Voraussetzungen, Status und idempotentem Abschluss verwaltet. Die zukünftigen Ereignisse sind **nur technisch vorbereitet**, nicht spielbar. Bitte diesen Zwischenstand noch nicht auf GitHub hochladen; der gemeinsame Browsertest folgt nach weiteren Entwicklungspaketen.

## dev.19 Zwischenstand
Nach Abschluss des Starter-Ei-Dialogs startet die mehrseitige Dimensionsszene. Mit E/Leertaste weiterblättern. Die Darstellung und Texte sind Arbeitsfassungen; Giratina schließt die Risse und wird nicht als Bösewicht dargestellt. Das Rivalen-Absol-Ereignis ist noch nicht umgesetzt. Noch nicht auf GitHub hochladen.

### dev.21
Nach dem Dimensionsereignis den Kindheitsfreund im Startdorf ansprechen, um die einmalige Absol-Szene zu erleben. Darstellung und Dialoge sind Arbeitsfassungen.


## dev.22 – Route 1 und Starter-Schlüpfen
Route 1 südlich des Startdorfs, Zugang nach Professor-Demonstration, einmaliges Schlüpfen beim ersten Betreten; Level 5, 31 IV, volle KP und versteckte Fähigkeit falls verfügbar; Speicherung und volle-Team-Fallback.
