import test from 'node:test';
import assert from 'node:assert/strict';
import {bagTargets} from '../src/bag.js';
test('dev.359: Beutel: ungültige Zielteams bei Gegenstandsauswahl ignorieren',()=>{
assert.deepEqual(bagTargets('potion',[null,{}, {stats:{hp:10},currentHp:5,moves:[]}]).map(x=>x.index),[2]);
});
