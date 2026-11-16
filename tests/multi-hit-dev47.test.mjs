import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function setup(move){const a=createPokemon(1,{level:40}),e=createPokemon(4,{level:40});a.moves=[move];e.moves=[33];const b=startBattle(a,e);b.player.pp=[20];b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;b.opponent.pokemon.currentHp=999;b.opponent.pokemon.stats.hp=999;return b}
test('Doppelkick trifft zweimal und verbraucht nur einen AP',()=>{const b=setup(24);playTurn(b,0,0,{rng:()=>0.1});assert.ok(b.log.includes('2 Treffer!'));assert.equal(b.player.pp[0],19)});
test('Duplexhieb trifft bei niedrigem Zufallswert zweimal',()=>{const b=setup(3);playTurn(b,0,0,{rng:()=>0.1});assert.ok(b.log.includes('2 Treffer!'))});
test('Nadelrakete kann fünfmal treffen',()=>{const b=setup(42);let n=0;playTurn(b,0,0,{rng:()=>++n===2?0.99:0.1});assert.ok(b.log.includes('5 Treffer!'))});
test('Mehrfachtreffer enden, sobald das Ziel kampfunfähig wird',()=>{const b=setup(24);b.opponent.pokemon.currentHp=1;playTurn(b,0,0,{rng:()=>0.1});assert.ok(b.log.includes('1 Treffer!'));assert.equal(b.opponent.pokemon.currentHp,0)});
test('Verfehlte Mehrfachattacke verursacht keinen Schaden',()=>{const b=setup(42);b.player.stages.accuracy=-6;b.opponent.stages.evasion=6;const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.99});assert.equal(b.opponent.pokemon.currentHp,hp);assert.ok(b.log.some(x=>x.includes('verfehlt')))});
