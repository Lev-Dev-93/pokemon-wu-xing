import test from 'node:test';
import assert from 'node:assert/strict';
import {startBattle,playTurn} from '../src/battle.js';
import {switchTeamPokemon} from '../src/battle-switch.js';
import {createPokemon} from '../src/team.js';
const rng=()=>0.01;
function setup(move){const p=createPokemon(1,{level:45});p.moves=[move,33];p.pp=[20,35];const q=createPokemon(4,{level:45});q.moves=[33];q.pp=[35];const e=createPokemon(7,{level:45});e.moves=[106];e.pp=[30];return {battle:startBattle(p,e),team:[p,q]}}
for(const [move,key] of [[115,'reflectTurns'],[113,'lightScreenTurns'],[219,'safeguardTurns'],[54,'mistTurns']]){
 test(`Team-Schutz ${key} überlebt Aus- und Einwechseln und verliert keine Extraround`,()=>{
  const {battle,team}=setup(move);playTurn(battle,0,0,{rng});
  const turns=battle.player.volatile[key];assert.equal(turns,4);
  const cache=new Map();let active=switchTeamPokemon(battle,team,0,1,cache);
  assert.equal(battle.player.volatile[key],turns);
  assert.equal(battle.playerSideFields[key],turns);
  active=switchTeamPokemon(battle,team,active,0,cache);
  assert.equal(battle.player.volatile[key],turns);
  assert.equal(cache.get(1).volatile[key],turns);
 });
}
test('Feldschutz läuft auch nach Wechsel in der Runde weiter ab',()=>{
 const {battle,team}=setup(115);playTurn(battle,0,0,{rng});
 const cache=new Map();switchTeamPokemon(battle,team,0,1,cache);
 playTurn(battle,0,0,{rng});
 assert.equal(battle.player.volatile.reflectTurns,3);
 assert.equal(battle.playerSideFields.reflectTurns,3);
});
