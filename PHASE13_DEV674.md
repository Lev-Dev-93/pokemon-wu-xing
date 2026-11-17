# Phase 13 – dev.674: Breiter Attacken- und Statuseffektblock

Basis: dev.673. Schwerpunkt: ein großer, datenorientierter Ausbau mehrerer Attackengruppen statt einzelner Bugfixes.

## Neu programmierte Effektgruppen

- Statuswert-Attacken: Charme (204), Metall-Sound (319), Jauler (336), Autotomie (475; nur Initiative, keine Gewichtsberechnung), Einrollen (489), Watteschild (538).
- Status-/Unterstützungsattacken: Grasflöte (320), Schlummerort (464), Gähner (281; verzögerter Schlaf), Verhöhner (269; temporäre Statusattackensperre), Heilung (287), Angeberei (207), Schmeichler (260), Heilwoge (505), Platscher (150; bewusster Leereffekt).
- Garantierte Trefferfolgen: Lehmschelle (189), Nitroladung (488), Fußtritt (490), Säurespeier (491), Käfertrutz (522), Dampfwalze (523), Elektronetz (527), Standpauke (555), Eiszeit (549).
- Weitere Trefferfolgen mit Chancen: Ladestrahl (451), Kalkklinge (534), Grasmixer (536), Nachtflut (539), diverse Gift-, Brand- und Paralyseattacken sowie Verwirrungs- und Zurückschreckeffekte (z. B. Siedewasser, Matschbombe, Feuersturm, Funkensprung, Luftschnitt, Eisenzunge, Hurrikan).
- Trefferfolgen werden nur bei tatsächlich verursachtem Schaden ausgelöst; vorhandene Immunitäten und Schutzfähigkeiten werden berücksichtigt. Eigene Stufensteigerungen bei Schadensattacken werden dem Anwender zugeordnet.

## Prüfung

872/872 automatisierte Node-Tests bestanden (11 zusätzliche Tests gegenüber dev.673). JavaScript-Syntaxprüfung erfolgreich. ZIP-Integrität wird beim Paketbau geprüft.

## Bewusste Grenzen

- Keine Behauptung einer vollständigen Abdeckung aller Attacken und Fähigkeiten. Zahlreiche komplexe Mechaniken (u. a. erzwungene Trainerwechsel, Gewicht, Gegenstände, Doppelkampf) sind noch nicht vollständig modelliert.
- Keine erfolgreiche interaktive Browser-Gesamtabnahme in diesem Block.
- Gähner, Verhöhner und vergleichbare Effekte sind auf den aktuellen Einzelkampfablauf ausgelegt; Teamwechsel- und Spezialfälle benötigen weitere Prüfung.
- Phase 12 bleibt durch die Nutzerfreigabe freigegeben. Phase 13 bleibt technisch in Entwicklung.
