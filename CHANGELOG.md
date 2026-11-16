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
