# Phase 13 – dev.695: Fokusgurt und Magieschild

- Neues getragenes Item `focus-sash`: Bei vollen KP wird ein sonst tödlicher Treffer auf maximal `aktuelle KP - 1` begrenzt; Item wird nach Auslösung verbraucht.
- Schutz gilt für den jeweiligen Treffer. Bei Mehrfachtreffern kann ein Folgetreffer das Pokémon besiegen.
- Bereits implementierte Robustheit wird vor Fokusgurt ausgewertet; verhindert Robustheit den K.o., bleibt der Fokusgurt erhalten.
- Fähigkeit Magieschild (ID 98) verhindert den indirekten Eigenverlust durch Leben-Orb; der Schadensbonus bleibt erhalten.
- Sechs zusätzliche Tests; 1029/1029 bestanden.
- Offen: Inventarausrüstung, Browser-End-to-End-Test, weitere Items und vollständige Fähigkeitenprüfung.
