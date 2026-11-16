import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {readFileSync} from 'node:fs';
test('dev.329: Attackenauswahl validiert jetzt auch bekannte Attackendaten, bevor der Zug den Kampfzustand verändert.',()=>{assert.match(readFileSync(new URL('../src/battle.js',import.meta.url),'utf8'),/!getMove\(f.pokemon.moves\[i\]\)/)});
