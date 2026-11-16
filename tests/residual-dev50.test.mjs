import {switchTeamPokemon} from '../src/battle-switch.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function setup(move=73, own=1, enemy=4){const a=createPokemon(own,{level:40}),e=createPokemon(enemy,{level:40});a.moves=[move,33];e.moves=[106];const b=startBattle(a,e);b.player.pp=[20,20];b.opponent.pp=[20];return b}
const rng=()=>0.01;
test('Egelsamen entzieht am Rundenende KP',()=>{const b=setup();const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.opponent.pokemon.currentHp,hp-Math.max(1,Math.floor(b.opponent.pokemon.stats.hp/8)));assert.equal(b.opponent.volatile.seeded,true)});
test('Egelsamen heilt den Anwender bis zu maximalen KP',()=>{const b=setup();b.player.pokemon.currentHp-=20;const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.ok(b.player.pokemon.currentHp>hp);assert.ok(b.player.pokemon.currentHp<=b.player.pokemon.stats.hp)});
test('Pflanzen-Pokémon sind gegen Egelsamen immun',()=>{const b=setup(73,4,1);playTurn(b,0,0,{rng});assert.equal(b.opponent.volatile.seeded,false)});
test('Egelsamen wird nicht erneut angepflanzt',()=>{const b=setup();playTurn(b,0,0,{rng});playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('bereits von Egelsamen')))});
test('Wasserring heilt jede Runde',()=>{const b=setup(392);b.player.pokemon.currentHp-=20;const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp-hp,Math.max(1,Math.floor(b.player.pokemon.stats.hp/16)))});
test('Verwurzler heilt jede Runde',()=>{const b=setup(275);b.player.pokemon.currentHp-=20;const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp-hp,Math.max(1,Math.floor(b.player.pokemon.stats.hp/16)))});
test('Heilung überschreitet nie die maximalen KP',()=>{const b=setup(392);playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp,b.player.pokemon.stats.hp)});

test('Wechsel entfernt Egelsamen und rundenweise Heilung',()=>{const b=setup(392);b.player.volatile.seeded=true;b.player.volatile.aquaRing=true;const team=[b.player.pokemon,createPokemon(7,{level:40})];const fighters=new Map();switchTeamPokemon(b,team,0,1,fighters);assert.equal(fighters.get(0).volatile.seeded,false);assert.equal(fighters.get(0).volatile.aquaRing,false)});
