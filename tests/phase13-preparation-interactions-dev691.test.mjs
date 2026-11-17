import test from 'node:test';
import assert from 'node:assert/strict';
import {preparationInteraction} from '../src/semi-invulnerable-rules.js';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.01;
function fight(preparation,attack){const p=createPokemon(1,{level:45}),e=createPokemon(4,{level:45});p.moves=[preparation];e.moves=[attack];const b=startBattle(p,e);b.player.pp=[20];b.opponent.pp=[20];b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;b.player.pokemon.stats.hp=1000;b.player.pokemon.currentHp=1000;return b;}
for(const [prep,attack] of [[19,87],[340,542],[91,89],[91,222],[291,57],[291,250]]){
 test(`Ausnahme ${attack} trifft während Vorbereitung ${prep}`,()=>{const b=fight(prep,attack);playTurn(b,0,0,{rng});assert.ok(b.player.pokemon.currentHp<1000,JSON.stringify(b.log));});
}
for(const [prep,attack] of [[19,33],[340,33],[91,33],[291,33],[91,87],[19,89]]){
 test(`Attacke ${attack} verfehlt verborgenes Ziel ${prep}`,()=>{const b=fight(prep,attack);playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp,1000);});
}
test('Verdoppelter Schaden ist nur für vorgesehene Interaktionen aktiv',()=>{
 assert.deepEqual(preparationInteraction(91,89),{canHit:true,multiplier:2});
 assert.deepEqual(preparationInteraction(19,87),{canHit:true,multiplier:1});
 assert.deepEqual(preparationInteraction(291,57),{canHit:true,multiplier:2});
 assert.deepEqual(preparationInteraction(19,33),{canHit:false,multiplier:1});
 assert.deepEqual(preparationInteraction(null,33),{canHit:true,multiplier:1});
});
