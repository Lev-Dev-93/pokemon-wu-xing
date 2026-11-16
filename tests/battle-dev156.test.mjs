import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.1;
function battle(move=52){const p=createPokemon(4,{level:35}),e=createPokemon(1,{level:35});p.moves=[move];e.moves=[33];return startBattle(p,e)}
test('Hitzeschutz reduziert Feuerschaden',()=>{const normal=battle(52),resist=battle(52);resist.opponent.pokemon.abilityId=85;playTurn(normal,0,0,{rng});playTurn(resist,0,0,{rng});assert.ok(resist.opponent.pokemon.currentHp>normal.opponent.pokemon.currentHp)});
