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
