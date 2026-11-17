# Phase 12 – Ergänzende Prolog-Abnahme (dev.661)

## Grundlage
Ausgehend vom vollständigen Projektstand dev.660. Die bestehende kanonische Prologfolge und die vorhandenen Szenen bleiben erhalten.

## Neu
- Durchgehender Engine-Integrationstest der Sequenz Geburtstag → Geburtstagsvorschau → Ei → Dimensionsereignis/Giratina → Absol → Elternbericht → Professoren-Vorführung mit schillerndem Raupy → Route-1-Schlüpfen.
- Speicher-/Lade-Prüfung nach jedem Handlungsschritt einschließlich Ei- und Teamzustand.
- Test der Einmaligkeit des Schlüpfens und des Prologabschlusses im Tagebuch.
- Direkter Aufruf der Professoren-Demonstration wird außerhalb des Cutscene-Modus, außerhalb der Forschungslichtung und vor Absol zurückgewiesen.

## Verifikation
- `npm test`: 811/811 erfolgreich.
- `node --check src/engine.js` und `node --check src/main.js`: erfolgreich.
- Headless-Chromium-Startversuch: Zeitüberschreitung; **kein** erfolgreicher visueller Browser- oder End-to-End-Test.

## Verbleibende Freigabebedingungen
Die gesamte Szene muss auf GitHub Pages mit echten Eingaben vom Schlafzimmer bis Route 1 durchgespielt werden. Dabei müssen Laufanimationen, Dialoge, automatische Wege, Türen, Save/Load und der Übergang zum Professoren-Tutorial kontrolliert werden. Die Engine-Integrationstests ersetzen diese Abnahme nicht.
