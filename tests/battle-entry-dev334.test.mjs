import test from 'node:test';
import assert from 'node:assert/strict';
import {applyEntryAbility} from '../src/battle-entry.js';

test('dev.334: Bedroher works with missing stages and log',()=>{
 const battle={player:{pokemon:{abilityId:22,currentHp:10}},opponent:{pokemon:{currentHp:10}}};
 assert.equal(applyEntryAbility(battle,'player'),battle);
 assert.equal(battle.opponent.stages.attack,-1);
 assert.ok(battle.log.some(line=>line.includes('Bedroher')));
});
test('dev.334: invalid imported attack stage is normalized before Bedroher',()=>{
 const battle={player:{pokemon:{abilityId:22,currentHp:10}},opponent:{pokemon:{currentHp:10},stages:{attack:Infinity}},log:[]};
 applyEntryAbility(battle,'player');
 assert.equal(battle.opponent.stages.attack,-1);
});
test('dev.334: weather entry survives missing battle log',()=>{
 const battle={player:{pokemon:{abilityId:2,currentHp:10}},opponent:{pokemon:{currentHp:10}}};
 assert.doesNotThrow(()=>applyEntryAbility(battle,'player'));
 assert.ok(Array.isArray(battle.log));
});
