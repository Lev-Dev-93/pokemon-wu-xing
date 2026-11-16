import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.1;
function setup(move){const a=createPokemon(1,{level:40}),e=createPokemon(4,{level:40});a.moves=[move];e.moves=[33];const b=startBattle(a,e);b.player.pp=[20];b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;return b}
test('Genesung heilt höchstens die Hälfte der maximalen KP',()=>{const b=setup(105);b.player.pokemon.currentHp=1;const hp=b.player.pokemon.stats.hp;playTurn(b,0,0,{rng});assert.ok(b.player.pokemon.currentHp>1);assert.ok(b.log.some(x=>x.includes('erhält')));assert.ok(b.player.pokemon.currentHp<=1+Math.floor(hp/2))});
test('Genesung überschreitet die maximalen KP nicht',()=>{const b=setup(105);b.player.pokemon.currentHp=b.player.pokemon.stats.hp-1;playTurn(b,0,0,{rng});assert.ok(b.player.pokemon.currentHp<=b.player.pokemon.stats.hp)});
test('Gigasauger absorbiert tatsächlich verursachten Schaden',()=>{const b=setup(202);b.player.pokemon.currentHp=10;playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('absorbiert')))});
test('Absorber kann keine KP über Maximum heilen',()=>{const b=setup(71);playTurn(b,0,0,{rng});assert.ok(b.player.pokemon.currentHp<=b.player.pokemon.stats.hp)});
test('Risikotackle verursacht Rückstoßschaden',()=>{const b=setup(38);playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('Rückstoßschaden')))});
test('Rückstoß kann den Angreifer kampfunfähig machen',()=>{const b=setup(38);b.player.pokemon.currentHp=1;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp,0);assert.equal(b.finished,true)});
test('Verfehlter Risikotackle verursacht keinen Rückstoß',()=>{const b=setup(38);b.player.stages.accuracy=-6;b.opponent.stages.evasion=6;playTurn(b,0,0,{rng:()=>0.99});assert.equal(b.log.some(x=>x.includes('Rückstoßschaden')),false)});
