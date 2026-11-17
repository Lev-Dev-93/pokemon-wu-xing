# Phase 13 – dev.691: Spezialinteraktionen bei Zweirunden-Attacken

- Eigenes Modul `src/semi-invulnerable-rules.js` für Erreichbarkeit und Schadensmultiplikatoren.
- Fliegen/Sprungfeder: Windstoß, Windhose, Donner und Orkan treffen; Windstoß und Windhose verursachen doppelten Schaden.
- Schaufler: Erdbeben, Intensität und Geofissur treffen; Erdbeben und Intensität verursachen doppelten Schaden.
- Taucher: Surfer und Whirlpool treffen und verursachen doppelten Schaden.
- Intensität erhält eine zufällige Stärkestufe 4–10 mit abgestufter Wahrscheinlichkeit und entsprechender Basisstärke.
- 13 neue Tests, insgesamt 995/995 erfolgreich.

## Grenzen

Weitere Sonderfälle, Fähigkeiten, getragene Items und die interaktive Browser-Gesamtabnahme sind noch offen. Insbesondere ist die vollständige Umsetzung von Geofissur und anderen K.-o.-Attacken nicht Bestandteil dieses Blocks. Phase 12 wurde nicht gezielt geändert.
