## 1.0.0-dev.449 – Phase-3-Integrationsstand
- Persistente Pokédex-Historie mit Gesehen-/Gefangen-Status, einschließlich alter Speicherstände.
- Sichtung bei Wild- und Trainerbegegnungen, Fangregistrierung bei erfolgreicher Aufnahme.
- Pokédex-Filter und Fortschrittsanzeige.
- Zusätzliche rein grafische Umgebungseffekte.
- Kampfeffekt-/Barrierefreiheit-Helfer als vorbereitete, noch nicht angebundene Module.
- JSON-Spielstandexport und Speicherdiagnose.
- Regressionstests ergänzt.

## dev.369 – Integration und Qualitätssicherung

- Integrationsprüfung fasst Welt-, Portal-, Story- und Erreichbarkeitsaudits zusammen.
- Neue automatisierte Regressionstests.

## dev.368 – Integration und Qualitätssicherung

- Weltprüfung erkennt mehrfach verwendete NPC-Kennungen innerhalb einer Karte.
- Neue automatisierte Regressionstests.

## dev.367 – Integration und Qualitätssicherung

- Erreichbarkeitsanalyse startet nur auf vorhandenen Karten.
- Neue automatisierte Regressionstests.

## dev.366 – Integration und Qualitätssicherung

- Portalprüfung verhindert Absturz bei fehlender Portal-Liste.
- Neue automatisierte Regressionstests.

## dev.365 – Integration und Qualitätssicherung

- Portal-Daten werden auf ganzzahlige Koordinaten und gültige Zielkennungen geprüft.
- Neue automatisierte Regressionstests.

## dev.364
- Richtungsabhängige Figur-Details.
- Visueller Regressionstest hinzugefügt.

## dev.363
- Lichtakzente an PC und Vorratskiste.
- Visueller Regressionstest hinzugefügt.

## dev.362
- Dezente Reflexe auf Wasserflächen.
- Visueller Regressionstest hinzugefügt.

## dev.361
- Bodenschatten für NPCs.
- Visueller Regressionstest hinzugefügt.

## dev.360
- Bodenschatten unter der Spielfigur.
- Visueller Regressionstest hinzugefügt.

## dev.354
- Entwicklungsidentität prüft zusätzlich erhaltene Attacken-AP.
- Regressionstest hinzugefügt.

## dev.353
- Nachholbare Attacken berücksichtigen die Lernliste der Regionalform.
- Regressionstest hinzugefügt.

## dev.352
- Attackenlernen berücksichtigt die Lernliste der Regionalform.
- Regressionstest hinzugefügt.

## dev.351
- Levelaufstieg berücksichtigt die Lernliste der Regionalform.
- Regressionstest hinzugefügt.

## dev.350
- Doppelte Attacken in Team- und Speicherdaten ablehnen.
- Regressionstest hinzugefügt.

## dev.339
- Kampfabschluss und Weltposition strenger prüfen.
- Neuer Regressionstest.

## dev.338
- Statusimmunität nur mit gültigen Typ-IDs.
- Neuer Regressionstest.

## dev.337
- Restschaden bei gebrochenen KP-Werten absichern.
- Neuer Regressionstest.

## dev.336
- Wetterzyklus ohne aktives Wetter konsistent halten.
- Neuer Regressionstest.

## dev.335
- Ungültige AP-Werte bei der Attackenwahl ausschließen.
- Neuer Regressionstest.

## 1.0.0-dev.313
- Einheitliche explizite Zwei-Kachel-Wegsegmente für alle sieben Außenkarten.
- Keine automatisch erzeugten Zusatzwege mehr; Dorfplätze ausdrücklich definiert.
- Gebäude und Hindernisse aus gemeinsamen Kartendaten; Kartenübersicht beigefügt.
- 629/629 Tests erfolgreich.

## dev.312 – Vollständige Neuplanung der Außenkarten

- Alle sieben Außenkarten und der Züchterhof mit neu abgestimmten Objektpositionen, geordneten Gebäudeparzellen, Wegachsen und spiegelnden Baumgruppen.
- Hausportale, Rückkehrpunkte und Wege an die neuen Positionen angepasst.
- Bestehende Weltgeografie, Story, Kämpfe und Innenräume beibehalten.

## dev.305

- Gemeinsames Karten-Audit kontrolliert, dass Straßen, Hindernisse und Wegkanten auf allen Außenkarten konsistent bleiben.

## dev.304

- Begegnungsflächen schließen sämtliche sichtbaren Außenwege, einschließlich Dorfwegen und dynamischen Verbindungswegen, ausdrücklich aus.

## dev.303

- Wegekanten berücksichtigen auch die tatsächlich berechneten Portalverbindungen, damit Weg und Rand nicht auseinanderlaufen.

## dev.302

- Lose Dekoration auf Route 1, Waldrand und Altem Wald wird nicht mehr auf Wegen oder blockierten Feldern gezeichnet.

## dev.301

- Die sichtbare Straßenfläche von Mu und Forschungsplatz ist jetzt auch in der gemeinsamen Terrainklassifikation hinterlegt; die Straßenformen stammen aus einer einzigen Geometriedefinition.

## dev.300
- Beerendorf-Dekoration und Buschplatzierung verwenden jetzt dieselbe Wegegeometrie wie die sichtbare Karte.
- Gemeinsame Layoutprüfung für Hauspositionen, Wege, Kollisionen und Begegnungsflächen.

## dev.299
- Beerendorf: Häuser am Ost-West-Hauptweg und kurze Stichwege zu allen Türen.

## dev.298
- Forschungsplatz: Labor und Professorenhaus entlang der Zugangsachse ausgerichtet.

## dev.297
- Dorf Mu: kompakte Nord-Süd-Hauptachse und klare Hausvorplätze.

## dev.296
- Wilde Pokémon erscheinen nur in hohem Gras abseits aller sichtbaren und berechneten Wege.

## dev.295 – Prolog-Recovery und Ereignisflags gemeinsam geprüft

- Prolog-Recovery und Ereignisflags gemeinsam geprüft.
- Regressionstest `story-stability-dev295.test.mjs`.

## dev.294 – Spielstand-Rückwege dürfen nicht auf NPCs enden

- Spielstand-Rückwege dürfen nicht auf NPCs enden.
- Regressionstest `story-stability-dev294.test.mjs`.

## dev.293 – Automatische Storywege beachten Höhenunterschiede

- Automatische Storywege beachten Höhenunterschiede.
- Regressionstest `story-stability-dev293.test.mjs`.

## dev.292 – Prologphasen behandeln fehlende Vorbedingungen sicher

- Prologphasen behandeln fehlende Vorbedingungen sicher.
- Regressionstest `story-stability-dev292.test.mjs`.

## dev.291 – Elternbericht nur nach abgeschlossener Absol-Szene

- Elternbericht nur nach abgeschlossener Absol-Szene.
- Regressionstest `story-stability-dev291.test.mjs`.


## dev.290
- Gemeinsamer Reise-Audit für Beerendorf, Alten Wald, Häuser und Portale.

## dev.289
- Beerendorfer Dekorationen werden von den Hauptwegen und Zugängen ferngehalten.

## dev.288
- Kollisions-Audit für sichtbare Häuser, Waldbäume und Büsche eingeführt.

## dev.287
- Alter Wald: mehrkachelige Baumgruppen ausschließlich auf tatsächlich blockierten Feldern; Weg bleibt sichtbar.

## dev.286
- Beerendorf: Ost-West-Ausgänge sichtbar markiert; veraltete Nord-Süd-Markierungen und doppelte Büsche entfernt.
## dev.285

- Regressionstests für Weganschlüsse, unpassierbare Büsche und Hindernisse auf den drei Reisekarten.

## dev.284

- Gelände- und Wegekanten verwenden dieselben Wegkoordinaten wie die Kartenzeichnung.

## dev.283

- Waldrand: Weg vom nördlichen Eingang zur östlichen Ausfahrt als Kurve dargestellt.

## dev.282

- Bachübergang: Weg vom westlichen Eingang zur Brücke und südlichen Ausfahrt optisch verbunden.

## dev.281

- Route 1: Ost-West-Weg mit Anschluss an beide Kartenportale statt irreführendem Nord-Süd-Hauptweg.

## dev.280

- Gemeinsame Karten-Dekorationsprüfung für freie Zugänge, Kollisionen und Weganschlüsse.

## dev.279

- Züchterhof: sichere Weide- und Gartendetails abseits der Laufwege.

## dev.278

- Forschungsplatz: Wege und Eingangsbereiche von Labor und Professorenhaus deutlich markiert.

## dev.277

- Mu: freier Platz und Wege mit dezenten Pflasterdetails, keine Dekoration auf Hausgrundrissen.

## dev.276

- Hofwege auf kollisionsfreie Zellen beschränkt; Durchgänge und Hausvorplatz hervorgehoben.

## dev.257 – Stabilisierung des Spielverlaufs
- Browser-Wiederaufnahme auf gemeinsamen Phasenresolver umgestellt; Tests ergänzt.

## dev.256 – Stabilisierung des Spielverlaufs
- Einheitliche, separat testbare Wiederaufnahmeentscheidung für Prolog-Spielstände.

## dev.255 – Stabilisierung des Spielverlaufs
- Laufzeitprüfung der automatischen Storywege vor Bewegung eingebaut.

## dev.254 – Stabilisierung des Spielverlaufs
- Wegkontinuität für automatische Storybewegungen prüfbar gemacht.

## dev.253 – Stabilisierung des Spielverlaufs
- Automatische Storywege: gültiger Startpunkt und Grenzfälle abgesichert.

## dev.242
- Deterministische Regressionstests für zentrale Fähigkeitsfunktionen.

## dev.241
- Wetter-Schadensimmunität und Statusheilung zentralisiert.

## dev.240
- Wetterabhängige Initiative und Ausweichwerte zentralisiert.

## dev.239
- Status- und Verwirrungsschutz zentralisiert.

## dev.238
- Zentrale Wetterunterdrückung in ability-effects.js.


## dev.207 – Regressionstests und Abschluss

## dev.206 – Pokémon-Wechsel und temporäre Effekte

## dev.205 – Zurückschrecken und Aktionsreihenfolge

## dev.204 – Verwirrung und Kampfrunden

## dev.203 – Auftauen und Status-Immunitäten
## dev.197
- Erweiterte Pokémon-Kampf- und Teamdaten aus PokeAPI-CSV; Alola/Galar mit Form-ID.
- Spätere Entwicklungen der ursprünglichen 493 Arten.
- Regressionstests für Teamvalidierung, Werte, Typen und Lernlisten.

## dev.177
- Regressionstests für Kartenlayout, automatische Prologfolge und Story-Fortschritt.

## dev.172
- Zugangs- und Regressionsprüfungen für Waldhütte, Storygrenzen und Kampfsperre.

## dev.171
- Engine-Schnittstelle zur unverbindlichen Prüfung der Begegnungsbereitschaft.

## dev.170
- Validierung von Kampfentwürfen und sichere Ablehnung unvollständiger Konfigurationen.

## dev.169
- Vorbedingungen für eine künftige Waldhütten-Begegnung als reine Abfrage.

## dev.168
- Story-Begegnungsmodell mit ausdrücklich unbestimmtem Gegner und ohne automatischen Kampfbeginn.

## dev.167
- Breitensuche prüft zusammenhängende Zugänglichkeit aller Portale in Beerendorf und Altem Wald.

## dev.166
- Dialog der alten Dame stimmungsvoll überarbeitet: Celebi-Erinnerung und Ruinenhinweis, kein vorgezogener Bosskampf.

## dev.165
- Alter Wald erhält Lichtungsdetails und atmosphärische Bodenakzente ohne neue Kollisionen.

## dev.164
- Dezente Wegmarkierungen entlang Route 2 auf ausschließlich begehbaren Feldern.

## dev.163
- Gemeinsame, gebäudefreie Wegdarstellung in Mu und Beerendorf; durchgehender Dorfweg zum südlichen Ausgang.

# dev.157

- Magieschild: indirekten Schaden durch Wetter, Status und Egelsamen verhindern.

# dev.156

- Hitzeschutz: Feuerschaden halbieren.

# dev.155

- Speckschicht: Feuer- und Eisschaden halbieren.

# dev.154

- Adrenalin: Angriffsschub bei Statusproblemen und keine Verbrennungs-Halbierung.

# dev.153

- Schwebe: Immunität gegen Bodenattacken.

# dev.137

- Belohnungsdialog bleibt bei fehlgeschlagener Auswahl offen; Identitätstest für Entwicklungen.

# dev.136

- Einheitliche, deduplizierte Belohnungswarteschlange im Kampf.

# dev.135

- Levelaufstiege mit deduplizierten Entwicklungsoptionen und Vorschau.

# dev.134

- Vorschau von Entwicklungswerten ohne Änderung des Teams.

# dev.133

- Lernbare Attacken für übersprungene Level ermitteln.

## dev.127 – Kampfsystem-Integration

Integrationsprüfungen und manueller Browsertestplan.

## dev.126 – Kampfsystem-Integration

Trainerbelohnung nur nach vollständigem Sieg.

## dev.125 – Kampfsystem-Integration

Team-Niederlage führt zur Adoptivmutter und heilt das Team.

## dev.124 – Kampfsystem-Integration

Gegner ohne verbleibende AP beendet Kampf ohne Sackgasse.

## dev.123 – Kampfsystem-Integration

Kampfausgänge und Teamwechsel zentral klassifiziert.

## dev.122 – Dialoge im Spielfenster

Die Dialogbox liegt nun als responsives Overlay am unteren Rand der Weltansicht, auch im Vollbildmodus. Keine Änderungen an Story, NPCs oder Karten.

## dev.121 – Beerendorf, Waldhütte und Baumkollisionen

Vier Gebäude in Beerendorf: Werkstatt, Kräuterladen, Kräuterhexe (Heilung), Wohnhaus. Zusätzliche dekorative Beerensträucher. Alte Dame in eigener Waldhütte. Sichtbare Baumgruppen sind unpassierbar. Keine Sammelitems oder Nebenaufgaben.

## dev.120 – Zuchtfarm, Marktstand, einheitliche Kamera

- Weide mit Zaun und Zugang; Teich mit Wasser-Kollisionen.
- Küche und Wohnzimmer neu eingerichtet.
- Marktgebäude entfernt, Marktstand und Händler auf Dorfplatz.
- Einheitliche 512 × 384 Pixel Spielfläche, Kamera folgt Spieler auf großen Karten.

## dev.118 – Vollbild, Kampf im Spielfenster, Bach und Waldgestaltung

- Fullscreen API mit Umschaltknopf.
- Kampf ersetzt die Weltansicht im selben Rahmen.
- Wasser des Bachs wird nicht mehr durch Kollisionsgrafiken verdeckt.
- Mehr Bäume am Waldrand und zusammenhängende mehrkachelige Baumgruppen im Alten Wald.

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

## dev.102 – Landschaftsgestaltung
Alter Wald mit dichterer Vegetation und Kartentests.

## dev.101 – Landschaftsgestaltung
Beerendorf mit Beerenbeeten und Dorfdetails.

## dev.100 – Landschaftsgestaltung
Waldrand mit stärkerer Vegetation.

## dev.99 – Landschaftsgestaltung
Bach und Grasland mit zusätzlichen Ufer- und Wasserdetails.

## dev.98 – Landschaftsgestaltung
Deterministische Biome und Landschaftsdetails ohne Gameplay-Eingriff.

## dev.97 – Routenfolge und Werkstatt-Zugang korrigiert
- Route 1 → Bach → Waldrand → Beerendorf → Alter Wald.
- Werkstatt-Eingang auf sichtbare, begehbare Tür (4,5) verlegt; Beerendorf hat eigene Kartengrafik.
- Keine Herstellungsfunktion festgelegt.

## dev.96 – Neue Quest und Stabilisierung

## dev.95 – Alte Dame als Dialog-Platzhalter

## dev.94 – Route 2 Alter Wald

## dev.93 – Beerendorf mit offener Werkstatt

## dev.92 – Routenfolge und Altspielstand-Migration

## dev.83
UI für Entwicklungssteine und verfügbare Freundschaftsentwicklungen; Regressionstests.

## dev.82
Tag-/Nacht-Bedingungen für Freundschaftsentwicklungen.

## dev.81
Freundschaftsentwicklungen mit Grenzwertprüfung.

## dev.80
Freundschaftswert für Pokémon mit rückwärtskompatiblen Spielständen; Zuwachs durch Bewegung.

## dev.79
Entwicklungssteine mit expliziten Itembedingungen und Verbrauch.

## dev.78
- Integrationstests für Uhrzeit-Anbindung und Rückwärtskompatibilität von Speicherständen.

## dev.77
- Wildkampf zeigt das tatsächliche Gebiet und Tag/Nacht an, statt jeden Kampf fälschlich als Route 1 zu bezeichnen.

## dev.76
- Tageszeit (06–19 Uhr Tag, sonst Nacht) aktiviert und in die Wildbegegnungen integriert; Uhrzeit bleibt außerhalb des Speicherstands.


## dev.75
Regressionstests und Dokumentations-/Release-Stabilisierung.

## dev.74
Waldpfad erweitert um zusätzliche Beobachter und untersuchbare Hinweise.

## dev.73
Kampferfahrung je besiegtem Trainer-Pokémon; Fortschritts- und AP-Synchronisierung.

## dev.72
Trainerteam mit zwei Pokémon und Kampf-Fortsetzung vor Auszahlung.

## dev.71
Gebiets- und Tageszeit-Begegnungstabellen mit gewichteter Auswahl und Validierung.
## 1.0.0-dev.61
- Entwicklung und Attackenlernen mit Regressionstests; AP-Synchronisierung zwischen Kampf und Team korrigiert.

## dev.58 – Prolog-Fehlerbehebung

- Automatischer Lauf zum Dorfplatz startet erst nach Abschluss des Starter-Ei-Dialogs.
- Normale Dialogabschlüsse lösen die Giratina-Sequenz nicht mehr aus.
- Veraltete Dialogereignisse beim Abschluss zurückgesetzt.
- Drei Regressionstests für den Prolog ergänzt.

## dev.57 – Stabilisierung

Regression: Beim Pokémon-Wechsel werden temporäre Kampfwertstufen und flüchtige Effekte (einschließlich Feuerfänger-Bonus) zurückgesetzt; KP, AP und dauerhafte Statusprobleme bleiben erhalten. Vier gezielte Integrationstests ergänzt. Browsertest ausstehend.

## dev.56 – Typabsorption und Feuerfänger

- H2O-Absorber (Fähigkeit 11) heilt bei gegnerischen Wasser-Schadensattacken bis zu 25 % der maximalen KP, statt Schaden zu nehmen.
- Voltabsorber (Fähigkeit 10) heilt entsprechend bei Elektro-Schadensattacken.
- Feuerfänger (Fähigkeit 18) blockiert Feuer-Schadensattacken und verstärkt eigene Feuerattacken bis zum Wechsel um 50 %.
- Die Absorption erfolgt nach der Trefferprüfung; ein Fehlschlag aktiviert die Fähigkeit nicht.
- Automatisierte Regressionstests für alle drei Fähigkeiten.


## dev.56 – Trockenheit und Wetterunterdrückung
- Trockenheit: 1/8 KP Heilung bei Regen, 1/8 KP Schaden bei Sonne.
- Wolke Sieben und Klimaschutz unterdrücken Wetterwirkungen, ohne das Wetter oder seine Restdauer zu entfernen.
- Wetterdauer läuft auch während der Unterdrückung weiter.
## dev.52 – Wetterabhängige Attacken
- Donner: Regen trifft sicher, Sonne 50 % Basisgenauigkeit.
- Solarstrahl: Sonne sofort; sonst eine Runde Aufladen und dann Angriff, bei Regen/Sand/Hagel halbe Stärke.
- Aufladen verbraucht AP nur einmal und wird beim Wechsel abgebrochen.

## dev.52 – Wetter im Kampf
- Sonnenschein, Regen, Sandsturm, Hagel (je fünf Runden).
- Feuer-/Wasser-Schadensmodifikatoren und Wetterschaden mit Typ-Immunitäten.
- Synthese und Morgengrauen berücksichtigen das Wetter.

## dev.50 – Egelsamen und wiederkehrende Heilung

- Egelsamen: 1/8 maximale KP pro Zug entziehen, Gegenseite heilen, Pflanzen-Immunität, kein mehrfaches Aussäen.
- Wasserring und Verwurzler: jeweils 1/16 maximale KP pro Zug heilen, keine Heilung über Maximal-KP.
- Effekte sind flüchtige Kampfeffekte und werden beim Wechsel des betroffenen Pokémon entfernt.

## dev.50 – Ausdauer

- Ausdauer (Attacke 203) verhindert Kampfunfähigkeit durch direkte Attackentreffer für einen Zug; mindestens 1 KP bleibt erhalten.
- Priorität +4; gemeinsamer Schutz-Wiederholungszähler mit Schutzschild und Scanner.
- Mehrfachtreffer werden berücksichtigt; Schutz läuft nach Zugende aus.
- Sieben neue automatisierte Tests.

## dev.48 – Schutzschild und Scanner

- Schutzschild (182) und Scanner (197) schützen für einen Zug vor gegnerischen Schadens- und Statusattacken.
- Wiederholter Schutz: Erfolgschance 1, 1/3, 1/9 usw.; andere Attacken setzen die Folge zurück.
- Priorität +4 aus Attackendaten, ein AP pro Einsatz.
- Sechs neue automatisierte Tests.

## dev.47 – Rückstoß, Absorption und Selbstheilung

- Bodycheck, Risikotackle und Überroller verursachen Rückstoß auf Basis tatsächlich verursachten Schadens.
- Absorber, Megasauger, Gigasauger und Ableithieb heilen den Anwender anteilig.
- Genesung, Weichei, Milchgetränk, Morgengrauen, Synthese und Tagedieb heilen bis zur Hälfte der maximalen KP (neutrale Wetterlage).
- Sieben neue automatisierte Tests.

## dev.45 – Sekundäre Kampfwert-Effekte

14 Schadensattacken erhalten ihre jeweiligen Zusatzchancen auf Kampfwert-Senkungen (Angriff, Verteidigung, Spezial-Verteidigung, Initiative oder Genauigkeit). Effekte greifen nur bei erfolgreichem Treffer und solange das Ziel kampffähig bleibt. Stufenbegrenzung −6 bleibt erhalten. Neun Regressionstests.

## dev.44 – Genauigkeit und Ausweichwert

Genauigkeits- und Ausweichstufen (−6 bis +6), Trefferberechnung und weitere Statusattacken (Sandwirbel, Doppelteam, Komprimator, Rauchwolke, Psykraft, Blitz, Lockduft, Trugträne, Schärfer).

## dev.43 – Verwirrung und Zurückschrecken

- Superschall und Konfustrahl lösen Verwirrung aus (2–4 Angriffsversuche); Psystrahl mit 10 % Chance.
- Verwirrte Pokémon können sich selbst verletzen, ohne AP zu verbrauchen.
- Kopfnuss, Biss und Stampfer können im selben Zug Zurückschrecken auslösen.
- Neue automatisierte Tests für Verwirrung und Zurückschrecken.

## dev.42 – AP-Heilmittel im Kampf

Äther, Top-Äther, Elixier und Top-Elixier können in Wild- und Trainerkämpfen verwendet werden. Pokémon und bei Einzelattackenmitteln die Attacke sind auswählbar; Reserve-Pokémon werden unterstützt. Nur erfolgreiche Anwendungen verbrauchen einen Gegenstand und lösen einen gegnerischen Zug aus.

## dev.39 – Beleber und Top-Genesung

Neue Beutelgegenstände: Beleber (halbe KP bei Kampfunfähigkeit) und Top-Genesung (volle KP und Statusheilung für kampffähige Pokémon). Beide im Dorfladen erhältlich. Ungültige Anwendung verbraucht nichts; Nutzung außerhalb des Kampfes und automatische Speicherung. Vorläufige Preise 120 bzw. 180 Pokédollar.

## dev.38 – Statusheilmittel im Kampf

Fünf Statusheilmittel können im Wild- und Trainerkampf auf das aktive Pokémon angewendet werden. Eine erfolgreiche Anwendung verbraucht den Gegenstand und einen Zug; anschließend greift der Gegner an. Ungültige Anwendungen verbrauchen nichts.

## dev.37 – Statusheilmittel im Beutel und Dorfladen

Gegengift, Feuerheiler, Para-Heiler, Aufwecker und Eisheiler sind im Dorfladen zu je 30 Pokédollar verfügbar. Sie können außerhalb des Kampfes im Beutel auf ein passendes, kampffähiges Team-Pokémon angewendet werden. Ungültige Anwendungen verbrauchen keinen Gegenstand; erfolgreiche Anwendungen werden gespeichert. Preise sind vorläufig.

## dev.36 – Statusmechaniken
- Statusschaden durch Gift und Verbrennung nun auch nach Gegner-Einzelzügen (Fangfehlschlag, Wechsel, Trank).
- Schlaf, Paralyse und Einfrieren verbrauchen keine AP, wenn keine Attacke ausgeführt wird.
- Gemeinsame Abschlusslogik für beide Zugarten inklusive Doppelk.o.

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

# Änderungsprotokoll

## 1.0.0-dev.26
- Optionaler Trainer auf Route 1 (Raupy Level 4 als vorläufige Testbesetzung).
- Trainerkampf mit eigenem Team-Pokémon, ohne Fang- oder Fluchtmöglichkeit.
- Sieg als persistentes Flag; erneutes Gespräch statt Wiederholungskampf.
- Niederlage erlaubt erneuten Versuch; EP und KP werden übernommen.

## dev.25 – Reiseversorgung

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

# dev.18 – Prolog-Ereignissystem (Zwischenstand)

- Neue datengetriebene Ereigniskette mit expliziten Voraussetzungen: Geburtstag, Ei, Dimensionsriss, Absol, Professor-Ausflug, Route 1.
- Ereignisse sind idempotent; erfolgreiche Übergänge werden einmal im Ereignisprotokoll erfasst.
- Geburtstagsvorschau und Starterwahl verwenden dieselbe zentrale Ereignisprüfung.
- Direktes Setzen kanonischer Ereignis-Flags über `setFlag` ist gesperrt.
- Ungültige Story-Reihenfolgen in Spielständen werden beim Laden abgewiesen.
- Tagebuch zeigt auch den Erhalt des Starter-Eis.
- **Noch nicht implementiert:** die späteren Storyszenen selbst, Dimensionsriss-Grafik, Absol, Professor-Kampf, Route 1.

## dev.19 – Dimensionsereignis (Zwischenstand)
- Mehrseitige, spielbare Dimensionsriss-Szene direkt nach der Ei-Übergabe.
- Originale Canvas-Überlagerung für Risse und abstrakte Giratina-Silhouette.
- `rift_closed` wird erst nach dem letzten Dialog gesetzt; Rivalen- und Professorereignisse bleiben gesperrt.
- Automatischer Wiederanlauf nach dem Laden eines Spielstands mit Ei vor Abschluss der Szene.

## 1.0.0-dev.21
- Absol-Ereignis am Rivalen nach abgeschlossenem Dimensionsereignis; einmalige Dialogszene und vorläufiger Canvas-Effekt.
- Rivalen-Partnerschaft im Story-Flag, Tagebuch und Speicherstand; keine Spieler-Teamveränderung.


## dev.22 – Route 1 und Starter-Schlüpfen
Route 1 südlich des Startdorfs, Zugang nach Professor-Demonstration, einmaliges Schlüpfen beim ersten Betreten; Level 5, 31 IV, volle KP und versteckte Fähigkeit falls verfügbar; Speicherung und volle-Team-Fallback.

## dev.23 – Wilde Pokémon auf Route 1
- Zufallsbegegnungen nur im hohen Gras nach dem Schlüpfen; vorläufige Begegnungstabelle: Raupy, Hornliu, Taubsi, Rattfratz.
- Wilde Pokémon Level 2–4 mit variablen IVs.
- Kampfbildschirm mit dem ersten kampffähigen Pokémon aus dem echten Team, KP/EP werden gespeichert.
- Fluchtknopf mit geschwindigkeitsabhängiger Chance; Fangsystem folgt in einer späteren Version.
- Testarena bleibt unabhängig vom Team erhalten.
- Speicherformat unverändert (Schema 6); Wildbegegnungen werden nicht mitten im Kampf gespeichert.

## dev.27 – Trainerpreis und Pokédollar
- Erster Trainersieg zahlt einmalig 80 Pokédollar.
- Guthaben im Beutel sichtbar; ältere Speicherstände erhalten 0 Pokédollar.
- Trainerpreis wird im Ereignisprotokoll gespeichert.

## dev.31 – Tränke im Kampf
- Trank im Wild- und Trainerkampf, maximal 20 KP, ein Gegnerzug als Kosten.
- Keine Anwendung bei vollen KP, Kampfunfähigkeit oder ohne Vorrat.
- Team-KP und Inventar werden nach Anwendung gespeichert.

## dev.34 – Erste Statusattacken
- Heuler, Rutenschlag, Silberblick, Kreideschrei, Schwerttanz, Wachstum, Agilität, Härtner und Panzerschutz ändern Kampfstufen.
- Stufen sind auf -6 bis +6 begrenzt; nicht implementierte Effekte bleiben ausdrücklich gekennzeichnet.

## dev.40 – Kampf-Beleber und Top-Genesung
- Beleber und Top-Genesung im Wild- und Trainerkampf mit gezielter Team-Auswahl.
- Erfolgreiche Anwendung verbraucht einen Gegenstand und einen Zug; Gegner greift anschließend an.
- Reserve-Pokémon und zwischengespeicherte Kämpfer werden synchronisiert.


## dev.41 – AP-Heilmittel
Äther, Top-Äther, Elixier und Top-Elixier im Dorfladen und im Beutel. AP bleiben nach Kämpfen und beim Pokémon-Wechsel erhalten; Heilstation füllt AP auf. Preise sind vorläufig.


## dev.47 – Mehrfachtreffer
- 12 Mehrfachtreffer-Attacken, darunter Doppelkick, Duplexhieb, Nadelrakete, Kugelsaat und Eisspeer.
- Ein Genauigkeitswurf und ein AP-Verbrauch je Attackeneinsatz; 2–5 Treffer mit gewichteter Verteilung.
- Treffer stoppen bei Kampfunfähigkeit; tatsächliche Trefferzahl im Kampfprotokoll.
- Fünf zusätzliche Regressionstests.

## dev.53 – Wetterfähigkeiten
- Chlorophyll (34) verdoppelt Initiative bei Sonne; Wassertempo (33) bei Regen.
- Sandschleier (8) bei Sandsturm und Schneemantel (81) bei Hagel multiplizieren die gegnerische Trefferrate mit 0,8.
- Fähigkeiten gelten nur solange das entsprechende Wetter aktiv ist.

## dev.54 – Wetterfähigkeiten: KP und Spezial-Angriff
- Regengenuss (Fähigkeit 44) heilt bei Regen am Rundenende 1/16 maximale KP.
- Eishaut (Fähigkeit 115) heilt bei Hagel am Rundenende 1/16 maximale KP.
- Solarkraft (Fähigkeit 94) verstärkt Spezial-Angriff bei Sonne um 50 %, verursacht am Rundenende 1/8 maximale KP Schaden.
- Effekte gelten auch in der letzten Wetterrunde und enden bei Wetterwechsel.


## dev.62
Route 1: Wegweiser, Wegmarkierung und zwei zusätzliche optionale NPCs.


## dev.63
Vorläufiger Waldpfad Mu (Route 2 als technische Erkundungskarte) mit Rückweg, Zugangssperre bis zum Schlüpfen, NPC und Speicherung. Keine neuen kanonischen Storyereignisse.


## dev.64
Waldpfad: weitere NPCs, eigene Begegnungstabelle, Level 4–6, Journal-Eintrag. Pokémon-Spezies weiterhin #001–493.

## dev.65 – Stabilisierung
- Speicherdaten: Rückkehrpositionen werden validiert und manipulierte Einträge entfernt.
- Routenpositionen werden gegen Storyfreigaben geprüft.
- Fortsetzen/Laden im Dorf startet die Giratina-Szene direkt, statt den Lauf erneut abzuspielen.
- Regressionstests für fehlerhafte Speicherstände und Kartenpositionen.

## dev.66
- Neue Karte Bachübergang zwischen Route 1 und Waldpfad; Brücke mit begehbarer Querung, Bach als Kollision, Tagebuchflag.

## dev.67
- Pixel-Art-Verfeinerung: Uferbewuchs, Schilf, Blumen, Holzplanken und Brückengeländer.

## dev.68
- Rundweg, Sperre vor dem Schlüpfen und Portalketten mit Regressionstests abgesichert.

## dev.69
- Zwei ansprechbare NPCs und zwei untersuchbare Objekte am Bach; ohne neue kanonische Storyereignisse.

## dev.70
- Abschließende Regressionstests für Portale, Brücke, NPC-Positionen und begehbare Wege.

## dev.84
Questdefinitionen und statusbasierte Voraussetzungen. 

## dev.85
Story- und NPC-Flags aktualisieren den Questfortschritt. 

## dev.86
Reisetagebuch zeigt aktive, erledigte und gesperrte Quests. 

## dev.87
Questlog wird in Speicherschema 7 validiert und aus Altständen rekonstruiert. 

## dev.87
Questlog wird beim Speichern und Laden validiert, ältere Spielstände werden migriert (Speicherschema 6 bleibt kompatibel).

## dev.88
Questzustand beim Neustart initialisiert, weitere Regressionstests.

## dev.89
- Entwicklertestmodus über ?devtools=1; Testgeld und Entwicklungssteine im Einstellungsmenü, normale Spieloberfläche unverändert.

## dev.90
- Questbeschreibungen und alle Questgruppen im Menü und Reisetagebuch sichtbar.

## dev.91
- Tag/Nacht-Anzeige direkt neben dem Gebietsnamen; Regressionstests für Tageszeitgrenzen.

## dev.128
Spielmenü vollständig innerhalb des Spielfensters, auch Vollbild.

## dev.129
Pokémon-Teamkarten und individuelle Detailansichten.

## dev.130
Erweiterte Detailwerte (IV/EV, AP, Freundschaft, Erfahrung), Freundschaftsentwicklung.

## dev.131
PC-Lager übersichtlicher mit KP und Team-/Box-Belegung.

## dev.132
Menü startet in Teamübersicht, Tastaturfokus und Dialogschutz.

## dev.138
- Beutel im Spielfenster: Kategorien, verständliche Gegenstandsnamen und Zielauswahl.

## dev.139
- Gegenstände werden anhand ihrer Wirkung in Medizin, AP, Steine, Pokébälle und Sonstiges gruppiert.

## dev.140
- Gegenstände nur auf gültige Pokémon-Ziele anwendbar; Erfolg speichert automatisch.

## dev.141
- Marktstand: zusätzlich Einkauf von fünf Exemplaren in einem Schritt.

## dev.142
- Bedienbarkeit und Tests für Inventar, Itemziele, AP und Entwicklungssteine.

## dev.143
- Escape schließt das Spielmenü nicht mehr; M öffnet und schließt es.

## dev.144
- Starter-Ei-Auswahl als scrollbares Overlay im Spielfenster, auch im Vollbild.

## dev.145
- Zentrale, testbare Story-Zugangssperren für Hof, Route 1 und Folgegebiete.

## dev.146
- Ladeprüfung verhindert unzulässige Folgegebiete vor dem Schlüpfen.

## dev.147
- Einheitliche Wiederaufnahme des offenen Dimensionsereignisses beim Laden/Fortsetzen.

## dev.148 – UI und Stabilisierung
- Kampfansicht direkt in den Spielrahmen integriert, identische Rahmenlogik für alle Overlays.

## dev.149 – UI und Stabilisierung
- Escape beendet den Kampf nicht mehr; Vollbild- und Spielsteuerung entkoppelt.

## dev.150 – UI und Stabilisierung
- Tagebuch im Spielfenster, mit Konfliktschutz für andere Fenster.

## dev.151 – UI und Stabilisierung
- Responsives Layout, große Schrift, Kontrast und Scrollbarkeit verbessert.

## dev.152 – UI und Stabilisierung
- Overlay-Wechsel und Tastaturfokus beim Schließen des Menüs abgesichert.

## dev.158
- Gemeinsame Gebäudegrundrisse für Startdorf und Beerendorf.

## dev.159
- Wegführung vor Eingängen und Marktstand korrigiert.

## dev.160
- Kollisionsflächen für Gebäude und dekorative Hindernisse vereinheitlicht.

## dev.161
- Erreichbarkeit aller Außentüren und Kartenübergänge automatisch geprüft.

## dev.162
- Weltlayout-Regressionsprüfungen und Dokumentation.

## dev.182
- End-to-End-Regressionsprüfungen für Fußwege und Speicherstände.

## dev.183
Automatischer Gang zu den Adoptiveltern nach der Treppe, Geburtstagslied und Dialog.

## dev.184
Deutlich sichtbares Erdbeben vor dem Aufbruch zur Giratina-Szene.

## dev.185
Übergang zum Geburtstagsdialog ohne doppelte Auslösung.

## dev.186
Erdbebeneffekt beim Laden zuverlässig zurücksetzen.

## dev.187
Zusätzliche Absicherung des automatischen Geburtstagswegs und Regressionstests.

## dev.192
- Regressionsprüfung und Kennzeichnung noch nicht spielbarer Erweiterungsmechaniken.

## dev.198
Sicherer Auswerter für spätere Entwicklungsbedingungen; unbekannte Trigger werden nicht stillschweigend akzeptiert.

## dev.199
Evolution beseitigt veraltete Regionalform-IDs; Arten bis jenseits #493 werden bei Levelentwicklungen zugelassen.

## dev.200
Explizite API zur Prüfung und Ausführung späterer Entwicklungen mit Kontext.

## dev.201
Identitäts- und Vorschaupfade auf die neue Entwicklungslogik abgestimmt; Regionalform-Vererbung bewusst nicht pauschalisiert.

## dev.202
Tests für Feelinara, regionale Voraussetzungen und nicht unterstützte Spezialtrigger.

## dev.212
Abschlussprüfung der Kampffähigkeiten und Tests; offene Spezialfähigkeiten bleiben als Folgearbeit.

## dev.213
Wetterfest schützt vor Sandsturm-/Hagelschaden.

## dev.214
Sandscharrer verdoppelt Initiative im Sandsturm.

## dev.215
Sandgewalt verstärkt Boden-, Gesteins- und Stahlattacken bei Sandsturm.

## dev.216
Laubschutz verhindert primäre Statusprobleme bei Sonne.

## dev.217
Automatisierte Regressionstests für Wetterfähigkeiten.

## dev.218
- Blitzfänger: Elektro-Immunität und Spezial-Angriffssteigerung.

## dev.219
- Sturmsog: Wasser-Immunität und Spezial-Angriffssteigerung.

## dev.220
- Vegetarier: Pflanzen-Immunität und Angriffssteigerung.

## dev.221
- Starthilfe: Elektro-Immunität und Initiativsteigerung.

## dev.222
- Trockenheit: Wasserattacken regenerieren KP.

## dev.223
- Tempomacher (20) verhindert Verwirrung.

## dev.224
- Magmapanzer (40) verhindert Einfrieren.

## dev.225
- Insomnia (72) verhindert Schlaf.

## dev.226
- Hydration (93) heilt Statusprobleme am Rundenende bei Regen.

## dev.227
- Expidermis (61) heilt Statusprobleme mit 1/3 Wahrscheinlichkeit am Rundenende.

## dev.228
Regionalformen: Form-spezifische Typen in Schadensberechnung, Statusimmunität und Wetter.

## dev.229
Typabsorbierende Fähigkeiten reagieren nun auch auf gegnerische Statusattacken des passenden Typs.

## dev.230
Absorptionslogik für Elektro-/Wasser-/Pflanzen-Statusattacken konsolidiert.

## dev.231
Eis-Pokémon sind gegen Einfrieren immun.

## dev.232
Eigene Status-/Heilattacken lösen keine gegnerischen Absorptionsfähigkeiten aus.

## dev.237 – Fähigkeitsinventur
Phasenweiser Implementierungsplan und Audit-Regressionstest.

## dev.243
Einwechsel-Fähigkeitsmetadaten zentralisiert.

## dev.244
Absorptionsfähigkeiten als gemeinsame Abfragen definiert.

## dev.245
Kampfablauf auf zentrale Absorptionslogik umgestellt.

## dev.246
Doppelten Wechselzustand bereinigt und Regressionstests ergänzt.

## dev.247
Zusätzlicher Regressionstest und technischer Statusbericht.

- dev.248: Schadensfähigkeiten in gemeinsame Modifikatorabfragen überführt (Solarkraft, Adrenalin, Feuerfänger, Sandgewalt, Hitzeschutz, Speckschicht).

- dev.249: Wetterabhängige Heilung und KP-Verlust über gemeinsame Abfrage vereinheitlicht.

- dev.250: Magieschild-Schutz vor indirektem Schaden über einheitliche Abfrage.

- dev.251: Fünf Regressionstests für zentrale Schadens- und Wetterfähigkeiten.

- dev.252: Dokumentierter Grundlagenstatus und offene Abdeckungsziele.

## dev.258 – Kardinale Weltgeografie
Forschungsplatz westlich von Mu; Labor und Professorenhaus umgezogen. Neue Ost-West-Verbindungen.

## dev.259 – Kardinale Weltgeografie
Südrand von Mu vollständig geschlossen.

## dev.260 – Kardinale Weltgeografie
Wegedarstellung an Himmelsrichtungen angepasst.

## dev.261 – Kardinale Weltgeografie
Kardinaler Routen-Audit ergänzt.

## dev.262 – Kardinale Weltgeografie
Migration älterer Spielstände auf Schema 8.

### dev.263 – Kartengestaltung
- Sanfte, deterministische Wegkanten an Grasland- und Waldpfaden ohne Kollisionsänderung.

### dev.264 – Kartengestaltung
- Mu, Forschungsplatz und Hof um nicht-blockierende Blumenbeete, Bänke und Forschungspflanzungen ergänzt.

### dev.265 – Kartengestaltung
- Bachufer mit durchgehenden Uferstreifen und Schilf gestaltet, Brückenfelder freigehalten.

### dev.266 – Kartengestaltung
- Waldrand und Alter Wald mit Laubstreu und Flechten akzentuiert, ohne neue Hindernisse.

### dev.267 – Kartengestaltung
- Beerendorf mit Kisten, Fässern und Beerenkörben belebt; zusätzliche Dekorations- und Kollisionsprüfungen.

### dev.268 – Büsche als Hindernisse
- Beerenbüsche in Beerendorf blockieren nun wie Bäume die Bewegung; Portale und Ankunftsfelder bleiben frei.
- Visuelle Buschfelder und Kollisionsfelder werden gemeinsam berechnet.

## dev.269 – Logische Wegführung und Kollisionsabgleich
- Kollisionsbewusste Wegverbindungen zwischen allen Außenportalen; Wegzeichnung umgeht Gebäude, Bäume und Büsche.
- Zusätzliche Prüfungen für alle Außenportale, Hindernisse und Himmelsrichtungen.

## dev.270 – Sichtbare Gebäudezugänge
- Weganschlüsse zu den Außentüren in Mu und Beerendorf vervollständigt.
- Neues Audit für freie, sichtbare Türvorplätze und Regressionstests.

## dev.271 – Weltzugang und Wegführung
- Portale per tatsächlicher Bewegungslogik auf Erreichbarkeit prüfen.
- Automatisierter Regressionstest für die neue Prüfung.

## dev.272 – Weltzugang und Wegführung
- Ankunftspositionen und Rückwege der Kartenübergänge absichern.
- Automatisierter Regressionstest für die neue Prüfung.

## dev.273 – Weltzugang und Wegführung
- Erreichbarkeit der NPC-Gesprächsfelder absichern.
- Automatisierter Regressionstest für die neue Prüfung.

## dev.274 – Weltzugang und Wegführung
- Gebäudegrundrisse und Portalpositionen abgleichen.
- Automatisierter Regressionstest für die neue Prüfung.

## dev.275 – Weltzugang und Wegführung
- Globale Reiseverbindungen und kombinierte Weltprüfung.
- Automatisierter Regressionstest für die neue Prüfung.

## dev.306
- Erdbebenlauf verwendet echte Fußwege statt Positionssprüngen.

## dev.307
- Wiederaufnahme prüft, ob der Lauf vom geladenen Feld möglich ist.

## dev.308
- Prüfung der drei möglichen Einstiegskarten in den Erdbebenlauf.

## dev.309
- Gemeinsamer Wiederaufnahmepfad für Laden und Fortsetzen, ohne Dialoge zu unterbrechen.

## dev.310
- Vollständige Validierung der Storyschritte und Kartenübergänge vor dem Start.

## dev.311 – Neuorganisation der Karten
Symmetrische Haeuser und Gaerten, neu zugeordnete Portale, neu gefuehrte Dorfwege und geordnete Waldbaumgruppen; neue Layout-Regressionstests.

## 1.0.0-dev.314
- Kampfablauf: validierter Einstieg.

## 1.0.0-dev.315
- Kampfablauf: einheitliche Attackenauswahl.

## 1.0.0-dev.316
- Kampfablauf: Wechselprüfung.

## 1.0.0-dev.317
- Kampfablauf: Ergebnisermittlung.

## 1.0.0-dev.318
- Kampfablauf: Positionsschutz bei Rückkehr.

## 1.0.0-dev.319
- Restschaden auf tatsächlich verbleibende KP begrenzt.

## 1.0.0-dev.320
- Wetterdauer in eigenständige, testbare Ablaufregel ausgelagert.

## 1.0.0-dev.321
- Status-Typimmunitäten zentralisiert.

## 1.0.0-dev.322
- Kampfrunden nach K.O. gesperrt.

## 1.0.0-dev.323
- Gleichzeitiges K.O. korrekt als Wechsel oder Niederlage aufgelöst.

## dev.324
- Erzwungener Wechsel bei gleichzeitigem K. o..

## dev.325
- Kampffortsetzung nach Doppel-KO bei Wechsel.

## dev.326
- Ungültige Einwechsel-Seiten werden abgefangen.

## dev.327
- Einwechsel-Wetter wird nur einmal ausgewertet.

## dev.328
- Reserve-KP beim Wiedereinwechseln mit Teamzustand synchronisieren.

## dev.329
- Attackenauswahl validiert jetzt auch bekannte Attackendaten, bevor der Zug den Kampfzustand verändert.

## dev.330
- Gegnerische Einzelzüge prüfen ebenfalls die Attackendaten vor jeglicher Zustandsänderung.

## dev.331
- Restschaden wird nur mit einer positiven ganzzahligen Schadensquote berechnet.

## dev.332
- Abgelaufenes Wetter wird auch bei einem inkonsistenten Wetterzähler bereinigt.

## dev.333
- Einwechsel-Fähigkeiten ignorieren fehlende oder kampfunfähige Gegenspieler sicher.

## dev.334
- Einwechsel-Fähigkeiten verarbeiten unvollständige Kampfzustände (fehlende Log- und Statusstufen-Container) sicher.
- Bedroher normalisiert ungültige Angriffsstufen vor der Absenkung.
- Drei zusätzliche Regressionstests.

## dev.340
- Story-Fortsetzung: zusätzliche Eingabevalidierung in src/story-sequence.js.

## dev.341
- Story-Fortsetzung: zusätzliche Eingabevalidierung in src/story-sequence.js.

## dev.342
- Story-Fortsetzung: zusätzliche Eingabevalidierung in src/story-itinerary.js.

## dev.343
- Story-Fortsetzung: zusätzliche Eingabevalidierung in src/story-itinerary.js.

## dev.344
- Story-Fortsetzung: zusätzliche Eingabevalidierung in src/story-guards.js.

## dev.345
- Weltvalidierung: portal coordinates; neue Prüffunktion validatePortalCoordinates mit Regressionstest.

## dev.346
- Weltvalidierung: portal targets; neue Prüffunktion validatePortalDestinations mit Regressionstest.

## dev.347
- Weltvalidierung: portal return routes; neue Prüffunktion validateReciprocalPortals mit Regressionstest.

## dev.348
- Weltvalidierung: npc placement; neue Prüffunktion validateActors mit Regressionstest.

## dev.349
- Weltvalidierung: interactable objects; neue Prüffunktion validateObjects mit Regressionstest.

## dev.355
- Inventar: Gegenstände ohne Mengenüberlauf hinzufügen.

## dev.356
- Inventar: ungültige Gegenstandskennungen beim Entfernen zurückweisen.

## dev.357
- Beutel: beschädigte Inventareinträge ohne Absturz ausblenden.

## dev.358
- Speicherstand: doppelte Inventarpositionen verhindern.

## dev.359
- Beutel: ungültige Zielteams bei Gegenstandsauswahl ignorieren.

## 1.0.0-dev.374 – Entwicklungsblock 370–374 (16.11.2026)
- dev.370: hohes Gras auf der Professorenlichtung, ausschließlich dekorative begehbare Felder abseits der Wege.
- dev.371: deterministische automatische Wegplanung aus dem Forschungslabor zur Lichtung.
- dev.372: automatische Spielerbewegung mit sichtbarer Professorenbegleitung; Eingaben während der Bewegung gesperrt.
- dev.373: überarbeitete geskriptete Raupy-Vorführung mit schillerndem Raupy, Professoren-Pokémon, Attackenerklärung und Fang; keinerlei Spieler-Kampfsteuerung.
- dev.374: Integrationstests und Anpassung der bestehenden Professoren-Regressionstests.
- Die genaue Pokémon-Art des Professors bleibt ausdrücklich offen, da sie in der bereitgestellten Story-Masterfassung nicht festgelegt ist.
- Kein Browser-E2E ausgeführt. Grafische Überarbeitung von Hof/Innenräumen aus dem breiteren Phasenplan ist noch nicht abgeschlossen.

## 1.0.0-dev.375–379 – Atmosphäre Mu
- dev.375: Forschungslichtung: Feldnotizen und Kleeblätter, Tutorialgras geschützt.
- dev.376: Route 1: Blumen und Schmetterlinge auf freien Grasflächen.
- dev.377: Bach: zusätzliche Wasserreflexe und Uferkiesel.
- dev.378: Beerendorf: Beerenblüten und Erntedekoration.
- dev.379: eigenständiges Render-Modul `src/mu-atmosphere.js`, fünf neue Tests, vollständiger Regressionstest.
- Kartenkollision, Portale, Wege, Story und Pokémon-Systeme unverändert.


## 1.0.0-dev.380–384 – Storypräsentation
- dev.380: Geburtstagsdialoge mit Pixelporträts und Sprechererkennung.
- dev.381: Eigenes Farbschema und Porträt für das Dimensionsereignis.
- dev.382: Absol-Porträt und Szenenidentität.
- dev.383: Professorenporträt für die geskriptete Raupy-Vorführung.
- dev.384: Dialogfortschritt, responsive Oberfläche und fünf Regressionstests.
- Bestehende Storytexte, Flags, Karten und Kampflogik unverändert.

## 1.0.0-dev.385–389 – Kampfdarstellung
- dev.385: KP-Farbbänder (hoch/mittel/niedrig) und zugängliche KP-Fortschrittsanzeige.
- dev.386: Typmarkierung der Attackenauswahl mit deutschen Typbezeichnungen.
- dev.387: Treffereffekte nach tatsächlich agierender Seite; Statuseffekte lösen keinen falschen Treffer aus.
- dev.388: Neue Kampffeld-Horizontdarstellung und Kampfplattformen; Animationen berücksichtigen reduzierte Bewegung.
- dev.389: Phasenmarkierung (Auswahl/Animation/Ergebnis), fünf neue Tests und vollständige Regression.
- Keine Änderungen an Kampfrechenregeln, Fangen, Erfahrung oder Storyablauf.

## 1.0.0-dev.390–394
Menügestaltung, Team-KP-Farbstufen, Pokédex für vorhandene Arten, gespeicherte Anzeigeeinstellungen und Zugänglichkeit. Details: RELEASE_DEV394.md.

## dev.395–399 – Alter Wald und Integration (16.11.2026)
- dev.395: Deterministische Farn-, Laub- und Pilzdekoration am Waldrand.
- dev.396: Moos, Farne und Laub im Alten Wald, ohne Weg- oder Kollisionsänderung.
- dev.397: Holzmaserung und Kräuterbündel in der Waldhütte.
- dev.398: Story-Schutzprüfung: Waldkampf bleibt ohne bestätigte Gegnerdaten deaktiviert.
- dev.399: Neue Renderintegration und fünf gezielte automatisierte Regressionstests.
- Keine neuen kanonischen Dialoge oder Ereignisse ergänzt. Visuelle Browserabnahme steht aus.

## Phase 3 – Zwischenstand dev.409
- dev.400–404: Eigenständige Umgebungsanimation für Außenkarten und reproduzierbare Dekorationspositionen.
- dev.405–409: Animationsphasen, Bewegungsreduktion, sichere Integration und fünf neue Tests.
- Noch kein abgeschlossener Gesamtblock dev.400–449.

## dev.452–460 – zusammengefasster Implementierungsblock
NPC-Animationszyklus, prozedurale Kampf-Pixelsilhouetten und Cutscene-Overlays. Siehe RELEASE_DEV460.md.

## dev.461 – Grafische Nacharbeit
- Neun eigenständige handgezeichnete Pixelmasken für frühe und storyrelevante Pokémon statt einheitlicher prozeduraler Silhouetten.
- Rückansichten und deterministischer Fallback für nicht abgedeckte Arten.
- Drei neue automatisierte Grafiktests, insgesamt 744/744 erfolgreich.

## dev.462
- Pokémon-Porträts in Team und Detailansicht; sichtbare Canvas-Kampfgrafik und Fallback.
