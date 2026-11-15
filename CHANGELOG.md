# Changelog

## 1.0.0-dev.14
- Testarena: EP-Vergabe nach Sieg, Levelaufstieg, Attackenlernen und bestätigte Levelentwicklung.
- Testarena: pixelige Platzhalter-Silhouetten, Trefferanimation und verbesserte KP-/Belohnungsanzeige.
- Keine Änderung am eigentlichen Team oder an der Story.

# Änderungsprotokoll

## 1.0.0-dev.13
- Isolierte Kampf-Testarena mit temporären Pokémon (#004 vs. #001).
- KP-Balken, Attackenbuttons, AP-Anzeige, Kampflog und Kampfende.
- Neustart und Rückkehr zur Welt; keine Änderungen an Team, Ei, Story oder Erfahrung.
- Regressions- und UI-Strukturtests.

# Änderungen dev.12

- Reines, separat testbares 1-gegen-1-Kampfmodul mit Kampfrunden, Initiative, Priorität, AP, Trefferchance, physischem/speziellem Schaden, STAB, Typen, K.O. und einfachen bestehenden Statuszuständen.
- Kampfdaten sind Kopien; das Modul verändert das gespeicherte Team nicht.
- **Bewusste Einschränkung:** Keine Kampfoberfläche, keine EP-Ausschüttung, keine Kampf-KI, kein vollständiges Attackeneffekt-System. Statusattacken und Attacken ohne Basisstärke zeigen einen Hinweis statt unrichtiger Wirkung. Keine spielbaren Kämpfe im Prolog.

# Änderungsprotokoll

## 1.0.0-dev.11
- Kumulative Erfahrungspunkte beim Erstellen neuer Pokémon.
- EP-Vergabe, Levelaufstiege bis Level 100 und Neuberechnung von Statuswerten unter Erhalt des bisherigen KP-Verlusts.
- Levelabhängige Attackenangebote; Ersetzen einer von vier Attacken nur nach expliziter Auswahl.
- Einfache Levelentwicklungen nur nach ausdrücklicher Bestätigung durch den aufrufenden Spielablauf.
- Komplexe Entwicklungen (Items, Freundschaft, Tauschen, Sonderbedingungen) weiterhin gesperrt.
- Teamansicht zeigt EP und mögliche Levelentwicklungen.
- Bestehende Spielstände mit EP=0 bleiben gültig.

# Änderungen

## 1.0.0-dev.9
- Pokémon-Team (max. 6), Lagerung, Reihenfolge, Heilung als Engine-Funktionen.
- Lokale Basiswerte und Fähigkeiten aus bereitgestelltem PokeAPI-Snapshot für Nationaldex 001–493.
- Pokémon-Instanz: Level, IV, EV, KP, Status, Fähigkeit, Shiny, Attackenplatzhalter.
- Team-Anzeige im Spielmenü.
- Save-Schema 6 mit Migration und Validierung.
- Starter-Ei bleibt strikt getrennt und schlüpft nicht vor Route 1.

# Changelog
## 1.0.0-dev.8
- Starterauswahl aus lokalem, geprüftem PokeAPI-Snapshot: 212 strukturelle Kandidaten.
- Deutsche Namen, Filter nach Name/ID, Auswahl nach Gesprächen mit beiden Adoptiveltern.
- Einmalige Wunschwahl und passendes Ei; persistente Speicherung, Schema 5 und Migrationsdefaults.
- Keine Teamaufnahme, kein Schlüpfen und keine künstlich vorgezogene Storysequenz.
- Automatisierte Tests für Datenintegrität, Auswahl und Save-Validierung.

## 1.0.0-dev.10 – Attacken und Entwicklungen
- Import der Attacken der Generationen 1–5, deutschen Namen, Typentabelle und Level-Up-Lernlisten aus PokeAPI CSV v2 (Schwarz/Weiß, Versionsgruppe 11).
- Neue Pokémon erhalten bis zu vier erlernbare Attacken; Teamvalidierung prüft Attacken-IDs.
- Entwicklungsbedingungen und Erfahrungswachstum sind als abfragbare Daten verfügbar; Entwicklung selbst wird bewusst noch nicht ausgeführt.
- Teammenü zeigt Attacken und mögliche Entwicklungsziele.
- 44 automatische Tests erfolgreich; kein bestätigter Browser-End-to-End-Test.
