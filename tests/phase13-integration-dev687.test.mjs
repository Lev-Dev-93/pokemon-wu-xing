import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createPokemon} from '../src/team.js';
import {startBattle} from '../src/battle.js';
import {switchTeamPokemon} from '../src/battle-switch.js';
import {trainerBattleAction} from '../src/trainer-battle-lifecycle.js';
const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('Trainer progression remains blocked by reward choices',()=>assert.equal(trainerBattleAction({kind:'trainer',finished:true,winner:'player',remaining:1,rewardsPending:true}),'rewards'));
test('Battle UI does not offer switching while reward decisions remain',()=>assert.match(source,/switchButton\.disabled=battleBusy\|\|pendingRewards\.length>0/));
test('Manual switching cannot replace a pending reward dialog',()=>assert.match(source,/function chooseBattleSwitch\(\)\{[\s\S]*?pendingRewards\.length\|\|document\.querySelector\('#battle-choices'\)\.children\.length/));
test('Battle turn refuses actions while reward decisions remain',()=>assert.match(source,/async function executeBattleTurn\(index\)\{if\(!battle\|\|battleBusy\|\|battle\.finished\|\|pendingRewards\.length/));
test('Switch choice callback also rejects pending reward tasks',()=>assert.match(source,/async function performBattleSwitch\(index\)\{\s*if\(!battle\|\|battleBusy\|\|pendingRewards\.length/));
test('Entry hazard replacement permits returning to still-healthy outgoing Pokemon',()=>{
 const first=createPokemon(1,{level:20});const second=createPokemon(4,{level:20});
 const team=[first,second];const battle=startBattle(first,createPokemon(7,{level:20}));
 // Four layers of spikes are clamped to three; force lethal entry via low HP.
 team[1].currentHp=1;
 battle.playerSideFields={spikes:3};
 const index=switchTeamPokemon(battle,team,0,1);
 assert.equal(index,1);
 assert.equal(battle.player.pokemon.currentHp,0);
 assert.equal(battle.pendingSwitch?.side,'player');
 assert.equal(battle.finished,false);
});
