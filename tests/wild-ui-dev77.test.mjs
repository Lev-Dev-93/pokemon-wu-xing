import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('wild battle uses current map instead of fixed Route 1 label',()=>{const s=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');assert.match(s,/Wildes Pokémon – \$\{engine\.map\.name\}/);assert.doesNotMatch(s,/Wildes Pokémon – Route 1/);});
