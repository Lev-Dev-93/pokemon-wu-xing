## dev.32 – Sichtbare NPCs und Reisevorräte; Flucht aus Trainerkämpfen

- Kartenrenderer zeichnet nun alle NPCs aus den Kartendaten, darunter Händler und Trainer.
- Reisevorräte werden als Truhe dargestellt.
- Gewöhnliche Trainerkämpfe können ohne Belohnung aufgegeben werden.

## dev.30 – Teamverwaltung und Lager

- Pokémon im Team an die erste Position setzen.
- Lagerzugriff im Dorfhaus nach dem Schlüpfen des Starters.
- Pokémon ablegen und entnehmen; mindestens ein Pokémon verbleibt im Team.
- Änderungen werden automatisch gespeichert.

## dev.29 – Dorfladen (technischer Zwischenstand)

Ein Händler im Startdorf verkauft Pokébälle (40 Pokédollar) und Tränke (60 Pokédollar) zu ausdrücklich vorläufigen Testpreisen. Der Laden ist nach dem Schlüpfen des Starters zugänglich. Käufe aktualisieren Guthaben, Inventar, Ereignisprotokoll und Autosave.

## dev.28 – Pokémon-Wechsel im Kampf

- Pokémon-Wechsel in Wild- und Trainerkämpfen, sofern ein weiteres kampffähiges Teammitglied vorhanden ist.
- Ein freiwilliger Wechsel verbraucht den Zug und erlaubt dem Gegner eine Attacke.
- Nach einem K. o. kann ein weiteres Pokémon ohne zusätzlichen Gegnerzug eingewechselt werden.
- KP und Angriffs-AP der eingesetzten Pokémon bleiben beim Wechsel erhalten.
- Trainerkämpfe: Fang und Flucht bleiben gesperrt.
- Oberfläche weiterhin vorläufig; Browsertest ausstehend.

## dev.26 – Reiseversorgung

- Dorfhausbewohner heilt nach dem Schlüpfen das gesamte Team (KP und Status).
- Reisevorräte: einmalig drei Tränke im Dorfhaus.
- Tränke im Beutel auf ein verletztes, nicht besiegtes Team-Pokémon anwenden (maximal 20 KP).
- Änderungen werden automatisch gespeichert; ältere Speicherstände bleiben ladbar.
- Browserprüfung steht aus.

## dev.24 – Fangsystem (technischer Zwischenstand)

- Fünf Pokébälle beim ersten Schlüpfen auf Route 1.
- Pokéball im Wildkampf werfen, KP- und statusabhängige Fangchance.
- Fehlversuch kostet einen Ball und ermöglicht einen gegnerischen Zug.
- Gefangene Pokémon werden ins Team (bis 6) oder Lager (bis 500) aufgenommen.
- Inventar und Team bleiben im bestehenden Speicherformat erhalten.
- Fangraten sind vorläufig und werden beim regionalen Balancing überprüft.

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

### dev.23: Wildbegegnungen
Nach Abschluss des Prologs und dem Schlüpfen auf Route 1 kann im hohen Gras ein wildes Pokémon erscheinen. Die Begegnungstabelle ist vorläufig, nicht endgültiger Story-Kanon. Wildkämpfe verwenden das erste kampffähige Team-Pokémon; KP und gewonnene EP bleiben nach dem Kampf erhalten. Flucht ist möglich, Fangen noch nicht. Das bisherige Testkampfsystem bleibt verfügbar. Während eines Wildkampfes wird nicht gespeichert; speichere nach dem Kampf.


### Trainerkampf (dev.26)
Auf Route 1 steht bei (10,8) ein optionaler junger Trainer. Sprich ihn nach dem Schlüpfen deines Starters an. Sein Raupy (Level 4) ist eine vorläufige Testbesetzung. Der Sieg wird gespeichert, nach einer Niederlage ist eine Wiederholung möglich. Trainerkämpfe erlauben weder Flucht noch Fangversuche.

### dev.27
Der erste Trainer auf Route 1 zahlt nach einem Sieg einmalig 80 Pokédollar. Das Guthaben steht im Beutel und wird gespeichert. Einkaufen ist noch nicht möglich.

### dev.31
Im Wild- und Trainerkampf können Tränke über „Trank verwenden“ eingesetzt werden. Der Gegner greift anschließend an.
