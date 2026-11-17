# Phase 13 – Kataloginventur dev.678

Diese Inventur ist **keine Vollständigkeitsbescheinigung**. Sie vergleicht den im Projekt enthaltenen Attackenkatalog und die Lernlisten mit statischen Referenzen im Kampfcode.

| Kennzahl | Anzahl |
|---|---:|
| Attacken im Katalog | 577 |
| Eindeutige Attacken in Lernlisten | 509 |
| Davon Statusattacken | 191 |
| Davon Schadensattacken | 318 |
| Statusattacken ohne irgendeine numerische ID-Referenz in battle.js | 88 |

## Verdachtsliste: nicht verifizierte Statusattacken

- 18: Wirbelwind
- 46: Brüller
- 77: Giftpuder
- 78: Stachelspore
- 102: Mimikry
- 118: Metronom
- 119: Spiegeltrick
- 144: Wandler
- 160: Umwandlung
- 164: Delegator
- 166: Nachahmer
- 169: Spinnennetz
- 170: Willensleser
- 171: Nachtmahr
- 174: Fluch
- 176: Umwandlung2
- 180: Groll
- 191: Stachler
- 193: Scharfblick
- 194: Abgangsbund
- 195: Abgesang
- 199: Zielschuss
- 212: Horrorblick
- 213: Anziehung
- 214: Schlafrede
- 215: Vitalglocke
- 226: Stafette
- 227: Zugabe
- 254: Horter
- 256: Verzehrer
- 259: Folterknecht
- 262: Memento-Mori
- 266: Spotlight
- 267: Natur-Kraft
- 268: Ladevorgang
- 270: Rechte Hand
- 271: Trickbetrug
- 272: Rollenspiel
- 273: Wunschtraum
- 274: Zuschuss
- 277: Magiemantel
- 278: Aufbereitung
- 286: Begrenzer
- 288: Nachspiel
- 289: Übernahme
- 293: Tarnung
- 294: Schweifglanz
- 298: Taumeltanz
- 300: Lehmsuhler
- 312: Aromakur
- 316: Schnüffler
- 322: Kosmik-Kraft
- 335: Rückentzug
- 339: Protzer
- 346: Nassmacher
- 356: Erdanziehung
- 357: Wunderauge
- 361: Heilopfer
- 366: Rückenwind
- 373: Itemsperre
- 375: Psybann
- 379: Krafttrick
- 380: Magensäfte
- 381: Beschwörung
- 382: Egotrip
- 383: Imitator
- 388: Sorgensamen
- 390: Giftspitzen
- 393: Magnetflug
- 415: Wechseldich
- 433: Bizarroraum
- 446: Tarnsteine
- 461: Lunartanz
- 469: Rundumschutz
- 470: Schutzteiler
- 471: Kraftteiler
- 472: Wunderraum
- 476: Wutpulver
- 477: Telekinese
- 478: Magieraum
- 487: Überflutung
- 494: Zwango
- 495: Galanterie
- 501: Rapidschutz
- 502: Seitentausch
- 511: Verzögerung
- 513: Typenspiegel
- 516: Offerte

## Prüfmaßstab für die Freigabe

1. Für jede erlernbare Attacke eine eindeutige Implementierungszuordnung oder bewusst dokumentierte Einschränkung.
2. Für jede im Spiel verfügbare Fähigkeit mindestens einen gezielten Funktionstest und Tests für Wechselwirkungen.
3. Mehrere komplette wilde und Trainerkämpfe im Browser einschließlich Pokémon-Wechsel, Sieg, Niederlage und Rückkehr in die Welt.
4. Keine stillen Platzhalter für erlernbare Statusattacken; fehlende Effekte werden sichtbar gemeldet.
5. Phase 12 bleibt unangetastet.

**Achtung:** Die Verdachtsliste ist eine Priorisierung, keine bewiesene Liste defekter Attacken.
