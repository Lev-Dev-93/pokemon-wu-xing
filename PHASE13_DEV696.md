# dev.696 – Item-Ausrüstung im Inventar

- Tragbare Kampfitems erscheinen in eigener Beutelkategorie mit deutschen Namen.
- Item an Team-Pokémon anlegen, auswechseln oder abnehmen.
- Atomarer Austausch mit Inventar, keine Duplikate; nur außerhalb des Kampfs.
- Bestehendes Save-Schema 8 speichert `heldItemId` und Inventar ohne Migration.
- Inventaroberfläche bietet Zielauswahl und Abnehmen.
- Regressionstests in `tests/phase13-held-equip-dev696.test.mjs`.

Offen: Händler-Verfügbarkeit weiterer Items, Browser-E2E.
