# Aktueller Stand: 1.0.0-dev.399

Siehe `RELEASE_DEV399.md` und `TESTREPORT.md`.

> Aktuelle Version: **1.0.0-dev.389** – Kampfdarstellung und Integration. Siehe RELEASE_DEV389.md.

## dev.117 – Stabilisierung und Testvorbereitung

## dev.116 – Stabilisierung und Testvorbereitung

## dev.115 – Stabilisierung und Testvorbereitung

## dev.114 – Stabilisierung und Testvorbereitung

## dev.113 – Stabilisierung und Testvorbereitung

## dev.112 – Regressionsprüfung ohne Fundstellen, Items und Nebenquests

## dev.111 – Bestehende Funktions-NPCs und Storymechanik abgesichert

## dev.110 – Nicht storyrelevante NPCs und Untersuchungsobjekte entfernt

## dev.109 – Startdorf Mu gestalterisch verbessert

## dev.108 – Züchterhaus, Schlafzimmer und Hof gestalterisch verbessert

## dev.107 – Gebäudeübergänge und Regressionstests

## dev.106 – Dorfplatz und Innenraumdetails

## dev.105 – Zweites Wohnhaus und Dorfbewohner

## dev.104 – Begehbares Wohnhaus im Beerendorf

## dev.103 – Werkstatt als eigenständiger Innenraum mit passender Einrichtung


Aktueller Entwicklungsstand: dev.78. Pokémon nur Nationaldex #001–493; Attacken und Fähigkeiten perspektivisch aus allen Generationen.
## dev.58 – Korrektur der Giratina-Sequenz

Der Starter-Ei-Dialog wird vollständig gezeigt, bevor der einmalige automatische Lauf zum Dorfplatz beginnt. Der praktische Browsertest steht noch aus.

## dev.57 – Stabilisierung

Regression: Beim Pokémon-Wechsel werden temporäre Kampfwertstufen und flüchtige Effekte (einschließlich Feuerfänger-Bonus) zurückgesetzt; KP, AP und dauerhafte Statusprobleme bleiben erhalten. Vier gezielte Integrationstests ergänzt. Browsertest ausstehend.

**dev.56:** Trockenheit (Regenheilung/Sonnenschaden) und Wetterunterdrückung durch Wolke Sieben/Klimaschutz.
**dev.54:** Regengenuss, Eishaut und Solarkraft sind im Kampf aktiv (Wetterheilung, Sonnenschaden, Spezial-Angriffsbonus).
**dev.53:** Donner und Solarstrahl reagieren auf das Wetter; Solarstrahl lädt außerhalb von Sonne eine Runde auf.
**dev.53:** Sonnenschein, Regen, Sandsturm und Hagel: 5 Runden, Schaden und Wetterheilung.

**dev.50:** Egelsamen, Wasserring und Verwurzler mit rundenweiser KP-Veränderung.

**dev.50:** Ausdauer mit 1-KP-Überleben, Priorität, gemeinsamer Wiederholungsfolge und Mehrfachtreffer-Unterstützung.

**dev.48:** Schutzschild und Scanner mit Priorität, Blockierung und abnehmender Erfolgschance bei Wiederholung.

**dev.47:** Sekundäre Kampfwert-Senkungen bei Schadensattacken (z. B. Eissturm, Knirscher, Psychokinese, Lehmbrühe).

## dev.44 – Genauigkeit und Ausweichwert

Genauigkeits- und Ausweichstufen (−6 bis +6), Trefferberechnung und weitere Statusattacken (Sandwirbel, Doppelteam, Komprimator, Rauchwolke, Psykraft, Blitz, Lockduft, Trugträne, Schärfer).

## dev.43 – Verwirrung und Zurückschrecken

- Superschall und Konfustrahl lösen Verwirrung aus (2–4 Angriffsversuche); Psystrahl mit 10 % Chance.
- Verwirrte Pokémon können sich selbst verletzen, ohne AP zu verbrauchen.
- Kopfnuss, Biss und Stampfer können im selben Zug Zurückschrecken auslösen.
- Neue automatisierte Tests für Verwirrung und Zurückschrecken.

## dev.42 – AP-Heilmittel im Kampf

Im Wild- oder Trainerkampf die Schaltfläche „AP-Heilmittel“ auswählen, dann Gegenstand, Team-Pokémon und gegebenenfalls Attacke wählen. Nach erfolgreicher Anwendung folgt ein Gegnerzug. Die AP werden dauerhaft gespeichert. Der praktische Browsertest steht noch aus.

## dev.39 – Beleber und Top-Genesung

Neue Beutelgegenstände: Beleber (halbe KP bei Kampfunfähigkeit) und Top-Genesung (volle KP und Statusheilung für kampffähige Pokémon). Beide im Dorfladen erhältlich. Ungültige Anwendung verbraucht nichts; Nutzung außerhalb des Kampfes und automatische Speicherung. Vorläufige Preise 120 bzw. 180 Pokédollar.

## dev.38 – Statusheilmittel im Kampf

Fünf Statusheilmittel können im Wild- und Trainerkampf auf das aktive Pokémon angewendet werden. Eine erfolgreiche Anwendung verbraucht den Gegenstand und einen Zug; anschließend greift der Gegner an. Ungültige Anwendungen verbrauchen nichts.

## dev.37 – Statusheilmittel im Beutel und Dorfladen

Gegengift, Feuerheiler, Para-Heiler, Aufwecker und Eisheiler sind im Dorfladen zu je 30 Pokédollar verfügbar. Sie können außerhalb des Kampfes im Beutel auf ein passendes, kampffähiges Team-Pokémon angewendet werden. Ungültige Anwendungen verbrauchen keinen Gegenstand; erfolgreiche Anwendungen werden gespeichert. Preise sind vorläufig.

## dev.36 – Pokémon-PC und Statusprobleme

Sichtbarer, ansprechbarer Pokémon-PC im Dorfhaus; Interaktion öffnet das Lager. Giftpuder, Schlafpuder, Donnerwelle, Giftwolke und erste Zusatzstatus-Effekte; Statusimmunitäten und Aufwachen. Browsertest ausstehend.

## dev.34 – Prolog-Ablauf und vereinfachtes Dorfhaus

- Der Züchterhof bleibt bis zum Erhalt des Starter-Eis gesperrt.
- Unmittelbar nach der Starterauswahl setzt das Erdbeben ein; der Spieler läuft automatisch zum Dorfplatz, wo die Giratina-Szene beginnt.
- Die nicht sichtbaren Reisevorräte wurden aus dem Dorfhaus entfernt. Bestehende Spielstände bleiben kompatibel.
- Händler und junger Trainer bleiben erhalten.

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

# Pokémon Wu Xing – 1.0.0-dev.102

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

### dev.34
Erste neun Statusattacken verändern Angriff, Verteidigung, Spezial-Angriff oder Initiative während eines Kampfes.

## dev.40
Im Kampf sind Beleber und Top-Genesung über „Beleber / Top-Genesung“ auf auswählbare Team-Pokémon anwendbar. Die Anwendung kostet einen Zug.


## dev.41 – AP-Heilmittel
Äther, Top-Äther, Elixier und Top-Elixier im Dorfladen und im Beutel. AP bleiben nach Kämpfen und beim Pokémon-Wechsel erhalten; Heilstation füllt AP auf. Preise sind vorläufig.


### dev.47
Mehrfachtreffer-Attacken treffen 2 bis 5 Mal (Doppelkick und Duonadel stets zweimal); die Trefferzahl wird im Kampfprotokoll angezeigt.


### dev.56
Typabsorption: H2O-Absorber, Voltabsorber und Feuerfänger bei treffenden gegnerischen Schadensattacken. Feuerfänger verstärkt nach Aktivierung eigene Feuerattacken.

### dev.61: Fortschrittssystem
Levelentwicklungen und Speicherung der AP nach Kampfbelohnungen stabilisiert.

Designvorgabe: Nur Pokémon #001–493 (Generation 1–4); Attacken und Fähigkeiten aus **allen** Generationen sind langfristig vorgesehen. Die vollständige generationenübergreifende Abdeckung ist noch nicht implementiert.


### dev.62 – Testgebiet
Route 1 besitzt zusätzliche optionale Gespräche und Schilder.


### dev.63 – Testgebiet
Der Waldpfad ist eine austauschbare technische Testkarte; Storyinhalt bleibt unverändert.


### dev.64 – Testgebiet
Auf dem Waldpfad gibt es eine eigene vorläufige Begegnungstabelle und weitere Dialoge.

### dev.65 – Stabilisierung
Speicherstand-Validierung und Wiederaufnahme der Giratina-Szene im Dorf verbessert.

### dev.66
Neue Karte Bachübergang zwischen Route 1 und Waldpfad; Brücke mit begehbarer Querung, Bach als Kollision, Tagebuchflag.

### dev.67
Pixel-Art-Verfeinerung: Uferbewuchs, Schilf, Blumen, Holzplanken und Brückengeländer.

### dev.68
Rundweg, Sperre vor dem Schlüpfen und Portalketten mit Regressionstests abgesichert.

### dev.69
Zwei ansprechbare NPCs und zwei untersuchbare Objekte am Bach; ohne neue kanonische Storyereignisse.

### dev.70
Abschließende Regressionstests für Portale, Brücke, NPC-Positionen und begehbare Wege.

### dev.83
Team- und Beutelmenü zeigen verfügbare Entwicklungen.

### dev.84 – Questsystem
Technische Quests für bestehende Ereignisse; keine neuen kanonischen Storyereignisse.

### dev.85 – Questsystem
Technische Quests für bestehende Ereignisse; keine neuen kanonischen Storyereignisse.

### dev.86 – Questsystem
Technische Quests für bestehende Ereignisse; keine neuen kanonischen Storyereignisse.

### dev.87 – Questsystem
Technische Quests für bestehende Ereignisse; keine neuen kanonischen Storyereignisse.

### dev.88 – Questsystem stabilisiert
Keine neuen kanonischen Storyereignisse.

### dev.89
Entwicklertestmodus über ?devtools=1; Testgeld und Entwicklungssteine im Einstellungsmenü, normale Spieloberfläche unverändert.

### dev.90
Questbeschreibungen und alle Questgruppen im Menü und Reisetagebuch sichtbar.

### dev.91
Tag/Nacht-Anzeige direkt neben dem Gebietsnamen; Regressionstests für Tageszeitgrenzen.

## dev.137 – Pokémon-Menü
Das Spielmenü erscheint als Overlay direkt innerhalb des Spielfensters. Öffnen mit M; schließen mit Escape. Team und PC werden im Menü verwaltet.


### dev.138
Beutel im Spielfenster: Kategorien, verständliche Gegenstandsnamen und Zielauswahl.


### dev.139
Gegenstände werden anhand ihrer Wirkung in Medizin, AP, Steine, Pokébälle und Sonstiges gruppiert.


### dev.140
Gegenstände nur auf gültige Pokémon-Ziele anwendbar; Erfolg speichert automatisch.


### dev.141
Marktstand: zusätzlich Einkauf von fünf Exemplaren in einem Schritt.


### dev.142
Bedienbarkeit und Tests für Inventar, Itemziele, AP und Entwicklungssteine.


## dev.177 – Prolog und Dorfgeometrie
Automatische Storywege und korrigierte Gebäudeplatzierung. Siehe CHANGELOG.md.

### dev.182
End-to-End-Regressionsprüfungen für Fußwege und Speicherstände.

### Pokémon-Erweiterungskatalog (dev.188–192)
`src/pokemon-extensions.js` liefert aus PokeAPI-CSV abgeleitete spätere Entwicklungen und Alola-/Galarformen für ursprüngliche Arten #001–493. Die vorhandene Team-/Kampfengine unterstützt weiterhin nur die ursprünglichen 493 Arten; zusätzliche Arten/Formen sind noch nicht im Kampf, in Entwicklungen oder in der Grafik spielbar.


### dev.212: Einwechsel-Fähigkeiten
Wetterfähigkeiten, Bedroher und Innere Kraft sind im Kampfmodul ergänzt. Weitere Fähigkeiten und Spezialattacken bleiben offen.


**dev.463:** Phase 4 gestartet. Details: PHASE4_PLAN.md.
