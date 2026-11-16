import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function setup(move=203, enemyMove=33){const a=createPokemon(1,{level:40}),e=createPokemon(4,{level:40});a.moves=[move,182,33];e.moves=[enemyMove];const b=startBattle(a,e);b.player.pp=[10,10,30];b.opponent.pp=[30];return b}
test('Ausdauer rettet bei tödlichem Treffer mit einem KP',()=>{const b=setup();b.player.pokemon.currentHp=1;playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.player.pokemon.currentHp,1);assert.equal(b.player.pp[0],9);assert.ok(b.log.some(x=>x.includes('dank Ausdauer')))});
test('Ausdauer lässt normalen Schaden durch, solange kein KO droht',()=>{const b=setup();const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.1});assert.ok(b.player.pokemon.currentHp<hp&&b.player.pokemon.currentHp>1)});
test('Ausdauer endet nach einem Zug',()=>{const b=setup();b.player.pokemon.currentHp=1;playTurn(b,0,0,{rng:()=>0.1});playTurn(b,2,0,{rng:()=>0.1});assert.equal(b.player.pokemon.currentHp,0)});
test('Wiederholte Ausdauer kann scheitern',()=>{const b=setup();b.player.pokemon.currentHp=1;playTurn(b,0,0,{rng:()=>0.1});playTurn(b,0,0,{rng:()=>0.99});assert.equal(b.player.pokemon.currentHp,0);assert.ok(b.log.includes('Der Schutz ist fehlgeschlagen.'))});
test('Schutzschild und Ausdauer teilen die Wiederholungsfolge',()=>{const b=setup();b.player.pokemon.currentHp=1;playTurn(b,1,0,{rng:()=>0.1});playTurn(b,0,0,{rng:()=>0.99});assert.equal(b.player.pokemon.currentHp,0)});
test('Andere Attacke setzt Ausdauer-Erfolgsfolge zurück',()=>{const b=setup();playTurn(b,0,0,{rng:()=>0.1});playTurn(b,2,0,{rng:()=>0.1});b.player.pokemon.currentHp=1;playTurn(b,0,0,{rng:()=>0.99});assert.equal(b.player.pokemon.currentHp,1)});
test('Ausdauer schützt auch vor Mehrfachtreffern',()=>{const b=setup(203,24);b.player.pokemon.currentHp=1;playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.player.pokemon.currentHp,1);assert.ok(b.log.some(x=>x.includes('2 Treffer')))});
