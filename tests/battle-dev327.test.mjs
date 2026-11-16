import {test} from 'node:test';import {strict as assert} from 'node:assert';
import {applyEntryAbility} from '../src/battle-entry.js';
test('Einwechseln ohne Wetterfähigkeit erhält Wetter',()=>{const b={player:{pokemon:{abilityId:0,currentHp:10}},opponent:{pokemon:{abilityId:0,currentHp:10}},weather:'rain',weatherTurns:3,log:[]};applyEntryAbility(b,'player');assert.equal(b.weather,'rain');assert.equal(b.weatherTurns,3)});
