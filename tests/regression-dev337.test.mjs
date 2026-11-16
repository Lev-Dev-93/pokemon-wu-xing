import test from 'node:test';
import assert from 'node:assert/strict';
import {residualDamage} from '../src/battle-residual.js';
test('337: Restschaden bleibt ganzzahlig und nie größer als verbleibende KP',()=>{assert.equal(residualDamage({stats:{hp:100},currentHp:0.5}),0);assert.equal(residualDamage({stats:{hp:100},currentHp:2.8}),2);});
