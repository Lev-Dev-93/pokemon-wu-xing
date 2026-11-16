import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function setup(move=28){const p=createPokemon(1,{level:20}),e=createPokemon(10,{level:20});p.moves=[move];e.moves=[33];const b=startBattle(p,e);b.player.pokemon.stats.speed=100;b.opponent.pokemon.stats.speed=10;return b}
test('Sandwirbel senkt Genauigkeit',()=>{const b=setup();playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.opponent.stages.accuracy,-1)});
test('Doppelteam erhöht Ausweichwert',()=>{const b=setup(104);playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.player.stages.evasion,1)});
test('Genauigkeit und Ausweichwert wirken gemeinsam auf Treffer',()=>{const b=setup(33);b.player.stages.accuracy=-2;b.opponent.stages.evasion=2;const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.8});assert.equal(b.opponent.pokemon.currentHp,hp);assert.ok(b.log.some(x=>x.includes('verfehlt')))});
test('Genauigkeitssteigerung kompensiert Ausweichwert',()=>{const b=setup(33);b.player.stages.accuracy=2;b.opponent.stages.evasion=2;const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.8});assert.ok(b.opponent.pokemon.currentHp<hp)});
test('Genauigkeitsstufen bleiben auf sechs begrenzt',()=>{const b=setup(28);b.opponent.stages.accuracy=-6;playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.opponent.stages.accuracy,-6)});
test('Trugträne senkt Spezial-Verteidigung um zwei Stufen',()=>{const b=setup(313);playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.opponent.stages.specialDefense,-2)});
