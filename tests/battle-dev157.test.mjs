import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.1;
function battle(move=52){const p=createPokemon(4,{level:35}),e=createPokemon(1,{level:35});p.moves=[move];e.moves=[33];return startBattle(p,e)}
test('Magieschild verhindert Vergiftungsschaden',()=>{const b=battle(33);b.opponent.pokemon.abilityId=98;b.opponent.pokemon.status='poison';b.player.pokemon.moves=[106];b.player.pp=[30];const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.opponent.pokemon.currentHp,hp)});
