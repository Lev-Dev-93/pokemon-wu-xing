import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {createPokemon} from '../src/team.js';
import {switchTeamPokemon} from '../src/battle-switch.js';
import {forcedSwitchRequired,switchAllowed} from '../src/battle-switch-policy.js';
function fixture(){const a=createPokemon(1),b=createPokemon(4);return {team:[a,b],battle:{player:{pokemon:structuredClone(a),pp:[],stages:{},volatile:{}},opponent:{pokemon:createPokemon(7)},finished:false,winner:null,log:[]}}}
test('invalid active index never mutates party',()=>{const {team,battle}=fixture();const before=structuredClone(team);assert.throws(()=>switchTeamPokemon(battle,team,-1,1),/Ungültiger/);assert.deepEqual(team,before)});
test('invalid active Pokémon never mutates party',()=>{const {team,battle}=fixture();team[0].currentHp=-1;const before=structuredClone(team);assert.throws(()=>switchTeamPokemon(battle,team,0,1),/Ungültiger/);assert.deepEqual(team,before)});
test('draw with both fainted cannot be resumed by switch',()=>{const {team,battle}=fixture();team[0].currentHp=0;battle.player.pokemon.currentHp=0;battle.opponent.pokemon.currentHp=0;battle.finished=true;battle.winner='draw';assert.equal(forcedSwitchRequired(battle,team,0),false);assert.equal(switchAllowed(battle,team,0,1),false);assert.throws(()=>switchTeamPokemon(battle,team,0,1),/bereits beendet/)});
test('fainted player with surviving opponent may switch',()=>{const {team,battle}=fixture();team[0].currentHp=0;battle.player.pokemon.currentHp=0;battle.finished=true;battle.winner='opponent';assert.equal(forcedSwitchRequired(battle,team,0),true);assert.equal(switchAllowed(battle,team,0,1),true);assert.equal(switchTeamPokemon(battle,team,0,1),1);assert.equal(battle.finished,false)});
