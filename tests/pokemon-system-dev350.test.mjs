import test from 'node:test';import assert from 'node:assert/strict';import {createPokemon,validatePokemon,validateTeam} from '../src/team.js';
test('Doppelte Attacken sind ungültige Speicherdaten',()=>{const p=createPokemon(1,{level:20});p.moves=[33,33];assert.equal(validatePokemon(p),false);assert.equal(validateTeam([p]),false);});
