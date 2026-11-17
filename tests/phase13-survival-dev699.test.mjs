import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const mon=(species,abilityId=null,heldItemId=null)=>createPokemon(species,{level:40,abilityId,heldItemId});
function fight(abilityId,heldItemId){
 const a=mon(6),b=mon(1,null,heldItemId);
 a.moves=[33];b.moves=[150];
 const battle=startBattle(a,b);
 battle.opponent.pokemon.abilityId=abilityId;
 battle.player.pokemon.stats.attack=10000;
 battle.player.pokemon.stats.speed=10000;
 playTurn(battle,0,0,{rng:()=>0.5});return battle;
}
test('Robustheit schützt und meldet ausschließlich Robustheit',()=>{
 const b=fight(5,null);assert.equal(b.opponent.pokemon.currentHp,1);
 assert.ok(b.log.some(s=>s.includes('Robustheit')));
 assert.equal(b.log.some(s=>s.includes('Fokusgurt')),false);
});
test('Robustheit bewahrt gleichzeitig getragenen Fokusgurt',()=>{
 const b=fight(5,'focus-sash');assert.equal(b.opponent.pokemon.currentHp,1);
 assert.equal(b.opponent.pokemon.heldItemId,'focus-sash');
 assert.ok(b.log.some(s=>s.includes('Robustheit')));
 assert.equal(b.log.some(s=>s.includes('Fokusgurt')),false);
});
test('Ohne Robustheit löst Fokusgurt aus und wird verbraucht',()=>{
 const b=fight(null,'focus-sash');assert.equal(b.opponent.pokemon.currentHp,1);
 assert.equal(b.opponent.pokemon.heldItemId,null);
 assert.ok(b.log.some(s=>s.includes('Fokusgurt')));
 assert.equal(b.log.some(s=>s.includes('Robustheit')),false);
});
