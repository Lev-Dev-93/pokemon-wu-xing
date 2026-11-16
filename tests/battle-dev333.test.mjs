import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {applyEntryAbility} from '../src/battle-entry.js';
test('dev.333: Einwechsel-Fähigkeiten ignorieren fehlende oder kampfunfähige Gegenspieler sicher.',()=>{const b={player:{pokemon:{currentHp:10,abilityId:22}},opponent:{},log:[]};assert.equal(applyEntryAbility(b,'player'),b);assert.deepEqual(b.log,[])});
