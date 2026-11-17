import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
test('dev.330: Gegnerische Einzelzüge prüfen ebenfalls die Attackendaten vor jeglicher Zustandsänderung.',()=>{assert.match(readFileSync(new URL('../src/battle.js',import.meta.url),'utf8'),/!getMove\(e.pokemon.moves\[effectiveIndex\]\)/)});
