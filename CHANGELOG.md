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
