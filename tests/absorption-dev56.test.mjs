import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.5;
function setup(ability,move){const a=createPokemon(4,{level:40}),b=createPokemon(7,{level:40});a.moves=[move];b.moves=[33];const x=startBattle(a,b);x.opponent.pokemon.abilityId=ability;x.opponent.pokemon.stats.hp=160;x.opponent.pokemon.currentHp=80;x.player.pokemon.stats.speed=999;x.opponent.pokemon.stats.speed=1;return x}
test('H2O-Absorber heilt statt Wasserschaden',()=>{const x=setup(11,55);playTurn(x,0,0,{rng});assert.ok(x.log.some(s=>s.includes('H2O-Absorber')));assert.ok(x.opponent.pokemon.currentHp>=120)});
test('Voltabsorber heilt statt Elektroschaden',()=>{const x=setup(10,85);playTurn(x,0,0,{rng});assert.ok(x.log.some(s=>s.includes('Voltabsorber')));assert.ok(x.opponent.pokemon.currentHp>=120)});
test('Feuerfänger aktiviert Schadensbonus',()=>{const x=setup(18,52);playTurn(x,0,0,{rng});assert.equal(x.opponent.volatile.flashFireBoost,true);assert.ok(x.log.some(s=>s.includes('Feuerfänger')))});
test('Feuerfänger verhindert den Feuerschaden',()=>{const x=setup(18,52);x.opponent.pokemon.stats.hp=160;x.opponent.pokemon.currentHp=160;playTurn(x,0,0,{rng});assert.equal(x.opponent.pokemon.currentHp,160)});
test('Typfremde Attacke löst keine Absorption aus',()=>{const x=setup(11,33);playTurn(x,0,0,{rng});assert.ok(!x.log.some(s=>s.includes('H2O-Absorber')))});
test('Voltabsorber heilt nicht über maximale KP',()=>{const x=setup(10,85);x.opponent.pokemon.currentHp=159;playTurn(x,0,0,{rng});assert.ok(x.opponent.pokemon.currentHp<=160)});
