import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle} from '../src/battle.js';
import {switchTeamPokemon} from '../src/battle-switch.js';

test('cached fighter cannot overwrite party PP after item restoration',()=>{
 const team=[createPokemon(1),createPokemon(4)];const battle=startBattle(team[0],createPokemon(7));
 team[1].pp=[1,...team[1].moves.slice(1).map(()=>1)];
 const cache=new Map([[1,{pokemon:structuredClone(team[1]),pp:[0,0,0,0],stages:{},volatile:{}}]]);
 switchTeamPokemon(battle,team,0,1,cache);
 assert.deepEqual(battle.player.pp,team[1].pp);
});
test('switching away stores current PP and switching back restores it',()=>{
 const team=[createPokemon(1),createPokemon(4)];const battle=startBattle(team[0],createPokemon(7));const cache=new Map();
 battle.player.pp[0]-=1;const remaining=battle.player.pp[0];
 switchTeamPokemon(battle,team,0,1,cache);
 assert.equal(team[0].pp[0],remaining);
 switchTeamPokemon(battle,team,1,0,cache);
 assert.equal(battle.player.pp[0],remaining);
});
