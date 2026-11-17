import test from 'node:test';
import assert from 'node:assert/strict';
import {trainerBattleAction,trainerDefeated} from '../src/trainer-battle-lifecycle.js';
test('Trainerreserve verhindert vorzeitigen Abschluss',()=>{
 assert.equal(trainerBattleAction({kind:'trainer',finished:true,winner:'player',remaining:2}),'next-opponent');
 assert.equal(trainerDefeated({kind:'trainer',finished:true,winner:'player',remaining:2}),false);
});
test('Letztes Trainer-Pokémon beendet Kampf',()=>{
 assert.equal(trainerBattleAction({kind:'trainer',finished:true,winner:'player',remaining:0}),'complete');
 assert.equal(trainerDefeated({kind:'trainer',finished:true,winner:'player',remaining:0}),true);
});
test('Niederlage und Aufgabe gelten nicht als Trainersieg',()=>{
 for(const winner of ['opponent','escape','draw'])assert.equal(trainerDefeated({kind:'trainer',finished:true,winner,remaining:0}),false);
});
test('Ausstehende Belohnungen sperren nächsten Gegner',()=>{
 assert.equal(trainerBattleAction({kind:'trainer',finished:true,winner:'player',remaining:1,rewardsPending:true}),'rewards');
});
test('Laufender Zug und Animation sperren Trainerübergang',()=>{
 assert.equal(trainerBattleAction({kind:'trainer',finished:false,winner:null,remaining:1}),'ongoing');
 assert.equal(trainerBattleAction({kind:'trainer',finished:true,winner:'player',remaining:1,busy:true}),'wait');
});
test('Ungültige Reserve wird zurückgewiesen',()=>{
 assert.throws(()=>trainerBattleAction({kind:'trainer',finished:true,winner:'player',remaining:-1}));
});
