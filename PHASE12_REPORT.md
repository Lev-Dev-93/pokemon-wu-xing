# Phase 12 – Prolog, Entwicklungsstand dev.660

## Verbindliche Quellen
- Monsterreise_Story_Masterfassung_2026-11-14.pdf, Abschnitt 02
- Monsterreise_Technisches_Projekthandbuch_Neustart_2026-11-15.md, Abschnitte 2, 8, 10

## Implementiert in diesem Block
- Prologführung mit sechs kanonischen Meilensteinen und situationsabhängigen Hinweisen.
- Anzeige der nächsten Handlung im Tagebuch und im Tagebuchmenü.
- Reine Prüf-Funktion für unzulässige Storyreihenfolge, Elternbericht, Ei-/Teamzustand.
- Elf neue automatisierte Tests; keine Änderung am Save-Schema, an Story-Flags oder an Karten.
- Korrektur einer veralteten technischen Beschreibung im HTML.

## Bereits vorhanden und weiterverwendet
Geburtstag und Starterwunsch, Erschütterung und Giratina, Absol beim Rivalen, Rückkehr zu den Eltern, Professor-Ausflug und schillerndes Raupy, Route-1-Schlüpfen, Bewegungs-/Portal-/Save-System.

## Abnahme und Grenzen
- Automatisierte Tests: 809/809 erfolgreich.
- Browser-End-to-End: nicht als bestanden zu betrachten, solange die gesamte Sequenz nicht interaktiv geprüft wurde.
- Visuelle Prüfung: noch ausstehend.
- Kanonische Namen und genaue Dialoge sind teilweise offen; keine neuen Fakten erfunden.
- Die Prüf-Funktion ist diagnostisch und verändert keine Spielstände.
- Vollständige Phase-12-Freigabe erfordert das tatsächliche Durchspielen vom Schlafzimmer bis Route 1 inklusive Save/Load.

## Browser-Abnahmeschritte
1. Neues Spiel, Schlafzimmer → Treppe → Erdgeschoss, mit beiden Züchtern sprechen.
2. Geburtstagswunsch wählen und Ei erhalten; prüfen, dass es noch nicht im Team ist.
3. Erdbeben → Dorfplatz → Giratina-Risse; nach Szene erneut laden.
4. Absol-Begegnung und Rückkehr zu Adoptiveltern.
5. Professor aufsuchen; schillerndes Raupy, Vorführung und Fang prüfen.
6. Route 1 betreten; Ei schlüpft genau einmal und Pokémon erscheint im Team.
7. Tagebuch nach jedem Schritt prüfen; Speichern/Laden, Rückwege, Türen und Fokus testen.
