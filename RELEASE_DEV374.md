# Pokémon Wu Xing – 1.0.0-dev.374

Basis: 1.0.0-dev.369. Fokus: Professorenlichtung und vollständig geskriptetes Raupy-Tutorial.

## Umsetzung
- Sechs hohe Grasfelder in der Professorenlichtung; vorhandene Karten- und Portalgeometrie unverändert.
- Ansprache des Professors startet einen Cutscene-Modus. Spieler wird aus dem Labor über den Ausgang zum hohen Gras geführt; Professorenbegleitung ist auf der Lichtung sichtbar.
- Der Professor demonstriert den Kampf mit seinem eigenen, **noch nicht namentlich festgelegten** Pokémon, erklärt Attacken und Schwächen und fängt das schillernde Raupy.
- Keine Attacken-, Gegenstands- oder Fangentscheidung des Spielers; kein Raupy im Spielerteam. Am Ende wird die normale Steuerung wiederhergestellt, das Ereignis einmalig als abgeschlossen gespeichert.

## Prüfung
- `npm test`: 693/693 bestanden am 16.11.2026.
- Browser-E2E: nicht ausgeführt.
- Visuelle Screenshot-Abnahme: nicht ausgeführt.
- Für einen vollständigen visuellen Block 370–374 fehlen weitere Innenraum-/Hofgrafiken; diese Version beansprucht keine vollständige Abnahme dieses breiteren Grafikziels.

## Start
`python3 -m http.server 8000` im Projektverzeichnis; `http://localhost:8000` öffnen.
