import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {trainerBattleAction,trainerDefeated} from '../src/trainer-battle-lifecycle.js';
const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const advance=source.slice(source.indexOf('function advanceTrainerOpponent(){'),source.indexOf('function closeBattle(){'));
const render=source.slice(source.indexOf('function renderBattle(){'),source.indexOf('function startTestBattle(){'));
test('Trainer reward resolution happens before next opponent is offered',()=>{
 assert.match(render,/if\(battle\.finished&&!battleBusy\)\{settleTestBattle\(\);if\(trainerBattleAction/);
});
test('Advancing trainer opponent never grants experience twice',()=>{
 assert.doesNotMatch(advance,/grantTestExperience\(/);
 assert.match(advance,/syncWildPokemon\(\)/);
});
test('Pending move or evolution decision blocks trainer continuation',()=>{
 assert.equal(trainerBattleAction({kind:'trainer',finished:true,winner:'player',remaining:2,rewardsPending:true}),'rewards');
 assert.equal(trainerBattleAction({kind:'trainer',finished:true,winner:'player',remaining:2,rewardsPending:false}),'next-opponent');
});
test('Trainer victory is recognized only after final opponent',()=>{
 assert.equal(trainerDefeated({kind:'trainer',finished:true,winner:'player',remaining:1}),false);
 assert.equal(trainerDefeated({kind:'trainer',finished:true,winner:'player',remaining:0}),true);
});
test('Reward dialog completion synchronizes and saves team progress',()=>{
 assert.match(source,/if\(\['wild','trainer'\]\.includes\(battleKind\)\)\{syncWildPokemon\(\);autoSave\(\);\}renderBattle\(\);return;/);
});
