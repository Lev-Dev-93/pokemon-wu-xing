# Testbericht dev.461

- `node --test tests/*.test.mjs`: 744 bestanden, 0 fehlgeschlagen.
- `node --check src/battle-sprite-art.js`: bestanden.
- Neue Tests: vorhandene handgezeichnete Arten, Pixelgrenzen beider Ansichten, Fallback und ungültige IDs.
- Browser-End-to-End-Test und tatsächliche visuelle Sichtprüfung: **nicht durchgeführt**.
- Bekannte Einschränkung: Nur neun Arten haben eigenständige Pixelmasken; alle übrigen nutzen Platzhalter. Die neun Grafiken sind eigenständige Interpretationen, keine offiziellen artgetreuen Sprites.
