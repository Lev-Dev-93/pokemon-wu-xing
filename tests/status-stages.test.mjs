import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.1;
function setup(move){const a=createPokemon(4,{level:25}),b=createPokemon(1,{level:25});a.moves=[move];b.moves=[33];const fight=startBattle(a,b);fight.player.pp=[40];return fight}
test('Heuler senkt gegnerischen Angriff und verbraucht AP',()=>{const b=setup(45);playTurn(b,0,0,{rng});assert.equal(b.opponent.stages.attack,-1);assert.equal(b.player.pp[0],39)});
test('Rutenschlag senkt gegnerische Verteidigung',()=>{const b=setup(39);playTurn(b,0,0,{rng});assert.equal(b.opponent.stages.defense,-1)});
test('Schwerttanz erhöht eigenen Angriff um zwei Stufen',()=>{const b=setup(14);playTurn(b,0,0,{rng});assert.equal(b.player.stages.attack,2)});
test('Härtner erhöht eigene Verteidigung',()=>{const b=setup(106);playTurn(b,0,0,{rng});assert.equal(b.player.stages.defense,1)});
test('Stufen sind auf minus sechs und plus sechs begrenzt',()=>{const b=setup(14);b.player.stages.attack=5;playTurn(b,0,0,{rng});assert.equal(b.player.stages.attack,6)});
test('Komprimator erhöht den Ausweichwert',()=>{const b=setup(107);playTurn(b,0,0,{rng});assert.equal(b.player.stages.evasion,1)});
