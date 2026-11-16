import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../src/battle.js',import.meta.url),'utf8');
test('Tempomacher',()=>assert.match(s,/abilityId===20/));
test('Magmapanzer',()=>assert.match(s,/abilityId===40/));
test('Insomnia',()=>assert.match(s,/15,72/));
test('Hydration',()=>assert.match(s,/ability===93/));
test('Expidermis',()=>assert.match(s,/ability===61/));
