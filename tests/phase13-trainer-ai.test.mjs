import test from 'node:test';
import assert from 'node:assert/strict';
import {chooseTrainerMove} from '../src/trainer-ai.js';
import {createPokemon} from '../src/team.js';
import {startBattle} from '../src/battle.js';

test('trainer AI only chooses a legal attack and ignores depleted PP',()=>{
 const battle=startBattle(createPokemon(4,{level:12}),createPokemon(1,{level:12}));
 const enemy=battle.opponent;
 enemy.pp=enemy.pp.map((_,i)=>i===0?1:0);
 assert.equal(chooseTrainerMove(enemy,battle.player,()=>0.5),0);
});
test('trainer AI returns null if no PP remain',()=>{
 const battle=startBattle(createPokemon(4,{level:12}),createPokemon(1,{level:12}));
 battle.opponent.pp.fill(0);
 assert.equal(chooseTrainerMove(battle.opponent,battle.player),null);
});
test('trainer AI rejects invalid random values',()=>{
 const battle=startBattle(createPokemon(4,{level:12}),createPokemon(1,{level:12}));
 assert.throws(()=>chooseTrainerMove(battle.opponent,battle.player,()=>1),/Zufallswert/);
});
