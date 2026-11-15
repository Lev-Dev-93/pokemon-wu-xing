import test from 'node:test';import assert from 'node:assert/strict';import {createPokemon} from '../src/team.js';import {grantTestExperience,testExperienceReward,acceptMove,acceptEvolution} from '../src/battle-rewards.js';
test('Testbelohnung ist positiv und verändert nur übergebenes Pokémon',()=>{const p=createPokemon(4,{level:8}),e=createPokemon(1,{level:7}),copy=structuredClone(e);const r=grantTestExperience(p,e);assert.equal(r.amount,84);assert.ok(p.experience>0);assert.deepEqual(e,copy)});
test('Ungültige Testbelohnung wird abgewiesen',()=>assert.throws(()=>testExperienceReward({})));
test('Attackenlernen validiert die Lernliste',()=>{const p=createPokemon(1,{level:16});assert.throws(()=>acceptMove(p,9999));});
test('Entwicklung benötigt die korrekte Bedingung',()=>{const p=createPokemon(1,{level:16});acceptEvolution(p,2);assert.equal(p.speciesId,2)});
