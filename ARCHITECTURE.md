# Architektur dev.9

`src/team.js`: reine Regeln für Team, Statusberechnung und Lagerung. `src/pokemon-data.js`: offline-Basiswerte und Fähigkeiten, aus den bereitgestellten CSVs. `src/engine.js`: validierter persistenter Zustand; `src/main.js`: Anzeige. Keine künstliche Starter-Schlüpfung. Save-Schema 6.

# Architektur dev.8
- `src/starter-data.js`: deterministischer, statischer Import von 212 Starterarten aus der beigefügten CSV-Datenbasis.
- `src/engine.js`: Starterwahl nur nach beiden Gesprächen im Erdgeschoss; einmalig; validiert; Speichern Schema 5.
- `src/main.js`: Suchoberfläche, Fokus und Bedienung, Autosave nach Wahl.
- `src/maps.js`: Starterwunsch und Ei im zentralen Spielzustand.
- Keine Abhängigkeit vom Netz und keine neue Grafikengine.
- Offene Architekturaufgabe: Spielzustandsmaschine der Prologsequenz weiter vereinheitlichen; der vorhandene Geburtstagsvorschau-Button ist noch eine separate Testfunktion.

## Attacken- und Entwicklungsdaten (dev.10)
`src/battle-data.js` wird reproduzierbar aus der vom Nutzer bereitgestellten `01_Pokeapi_Full_Data.zip` mittels `tools/build_moves.py` erzeugt. Versionsgruppe 11 (Black/White) gilt für Level-Up-Attacken. Evolutionen übernehmen bis einschließlich dieser Version eingeführte Kanten und Bedingungen, weil sie in der Quelldatei historisch versioniert sind. Es gibt keine automatische Evolution, keine PP-Verbrauchslogik und noch keinen Kampf. `src/moves.js` stellt reine Abfragen bereit. Die im Team gespeicherten Attacken bleiben vorläufig IDs; spätere PP-Instanzen benötigen ein Speicherschema-Upgrade.


### Fortschrittssystem dev.11
`src/progression.js` trennt EP/Levelaufstieg, Attackenlernen und bestätigte einfache Levelentwicklung vom Kampf- und UI-System. Keine automatische Attackenüberschreibung oder Entwicklung. Legacy-Spielstände mit `experience: 0` werden bei der ersten EP-Vergabe auf die passende kumulative Basiserfahrung angehoben.

## Kampfmodul dev.12
`src/battle.js` enthält isolierte 1v1-Kampfzustände. `startBattle` klont Pokémon, `playTurn` verarbeitet eine Runde; `availableMoves` liefert Attacken/AP. Zufallsquelle kann für deterministische Tests injiziert werden. Noch keine Verbindung zur UI, Speichern oder Story.

## Kampf-Testarena dev.13
Die HTML-Kampfoberfläche in `index.html` und die UI-Anbindung in `src/main.js` verwenden die bestehende reine Kampflogik `src/battle.js`. Die Arena erzeugt temporäre Pokémon und schreibt keine Kampfergebnisse in den Spielstand.
