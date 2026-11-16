import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {residualDamage} from '../src/battle-residual.js';
test('dev.331: Restschaden wird nur mit einer positiven ganzzahligen Schadensquote berechnet.',()=>{assert.equal(residualDamage({stats:{hp:80},currentHp:20},0),0);assert.equal(residualDamage({stats:{hp:80},currentHp:20},-1),0);assert.equal(residualDamage({stats:{hp:80},currentHp:20},8),10)});
