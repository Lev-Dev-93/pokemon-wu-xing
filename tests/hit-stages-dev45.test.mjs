import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function battleFor(move){
 const a=createPokemon(4,{level:35}),b=createPokemon(1,{level:35});
 a.moves=[move];b.moves=[33]; 
 const battle=startBattle(a,b);battle.player.pokemon.stats.speed=999;battle.opponent.pokemon.stats.speed=1;battle.player.pp=[20];battle.player.pokemon.stats.attack=25;battle.player.pokemon.stats.specialAttack=25;battle.opponent.pokemon.stats.hp=999;battle.opponent.pokemon.currentHp=999;return battle;
}
const rng=value=>()=>value;
test('Eissturm senkt Initiative garantiert bei Treffer',()=>{const b=battleFor(196);playTurn(b,0,0,{rng:rng(0.1)});assert.equal(b.opponent.stages.speed,-1)});
test('Felsgrab senkt Initiative garantiert bei Treffer',()=>{const b=battleFor(317);playTurn(b,0,0,{rng:rng(0.1)});assert.equal(b.opponent.stages.speed,-1)});
test('Lehmschuss senkt Initiative garantiert bei Treffer',()=>{const b=battleFor(341);playTurn(b,0,0,{rng:rng(0.1)});assert.equal(b.opponent.stages.speed,-1)});
test('Knirscher senkt Verteidigung bei erfolgreicher Chance',()=>{const b=battleFor(242);playTurn(b,0,0,{rng:rng(0.1)});assert.equal(b.opponent.stages.defense,-1)});
test('Knirscher senkt Verteidigung nicht bei gescheiterter Chance',()=>{const b=battleFor(242);playTurn(b,0,0,{rng:rng(0.8)});assert.equal(b.opponent.stages.defense,0)});
test('Psychokinese kann Spezial-Verteidigung senken',()=>{const b=battleFor(94);playTurn(b,0,0,{rng:rng(0.05)});assert.equal(b.opponent.stages.specialDefense,-1)});
test('Lehmbrühe kann Genauigkeit senken',()=>{const b=battleFor(330);playTurn(b,0,0,{rng:rng(0.1)});assert.equal(b.opponent.stages.accuracy,-1)});
test('Sekundäre Senkung bleibt auf minus sechs begrenzt',()=>{const b=battleFor(196);b.opponent.stages.speed=-6;playTurn(b,0,0,{rng:rng(0.1)});assert.equal(b.opponent.stages.speed,-6)});
test('Bei verfehlter Attacke erfolgt keine Senkung',()=>{const b=battleFor(317);b.player.stages.accuracy=-6;b.opponent.stages.evasion=6;playTurn(b,0,0,{rng:rng(0.9)});assert.equal(b.opponent.stages.speed,0)});
