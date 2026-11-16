import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.1;
function battle(move=52){const p=createPokemon(4,{level:35}),e=createPokemon(1,{level:35});p.moves=[move];e.moves=[33];return startBattle(p,e)}
test('Adrenalin verstärkt physische Attacken bei Statusproblemen',()=>{const normal=battle(33),boost=battle(33);boost.player.pokemon.abilityId=62;boost.player.pokemon.status='burn';normal.player.pokemon.status='burn';playTurn(normal,0,0,{rng});playTurn(boost,0,0,{rng});assert.ok(boost.opponent.pokemon.currentHp<normal.opponent.pokemon.currentHp)});
