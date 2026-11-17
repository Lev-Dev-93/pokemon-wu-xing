import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.01;
function setup(move){const a=createPokemon(1,{level:40}),b=createPokemon(4,{level:40});a.moves=[move,33];b.moves=[150];const battle=startBattle(a,b);battle.player.pp=[10,10];battle.opponent.pp=[20];battle.player.pokemon.stats.speed=999;battle.opponent.pokemon.stats.hp=999;battle.opponent.pokemon.currentHp=999;return battle;}
for(const [id,name] of [[63,'Hyperstrahl'],[416,'Gigastoß'],[439,'Felswerfer'],[459,'Zeitenlärm']]){
 test(`${name}: erfolgreicher Treffer erzwingt eine Aussetzrunde ohne weiteren AP-Verbrauch`,()=>{
  const b=setup(id);playTurn(b,0,0,{rng});assert.equal(b.player.volatile.rechargeTurns,1);const pp=b.player.pp[0];const hp=b.opponent.pokemon.currentHp;
  assert.ok(hp>0);playTurn(b,1,0,{rng});assert.equal(b.player.volatile.rechargeTurns,0);assert.equal(b.player.pp[0],pp);assert.equal(b.player.pp[1],10);assert.equal(b.opponent.pokemon.currentHp,hp);
 });
}
test('Eine gewöhnliche Attacke erzwingt keine Aufladerunde',()=>{const b=setup(45);playTurn(b,0,0,{rng});assert.equal(b.player.volatile.rechargeTurns||0,0)});
