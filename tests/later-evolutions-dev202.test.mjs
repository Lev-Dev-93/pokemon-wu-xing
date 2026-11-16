import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon,validatePokemon} from '../src/team.js';
import {availableLaterEvolutions,evolveLaterPokemon} from '../src/progression.js';
test('Evoli evolves to Sylveon only with explicitly verified conditions',()=>{
 const p=createPokemon(133,{level:25});p.friendship=200;
 assert.equal(availableLaterEvolutions(p,{trigger:'level-up'}).some(x=>x.to===700),false);
 assert.equal(availableLaterEvolutions(p,{trigger:'level-up',knownMoveTypes:[18]}).some(x=>x.to===700),true);
 const before=structuredClone(p);evolveLaterPokemon(p,700,{trigger:'level-up',knownMoveTypes:[18]});
 assert.equal(p.speciesId,700);assert.equal(validatePokemon(p),true);
 assert.deepEqual(p.ivs,before.ivs);assert.deepEqual(p.evs,before.evs);assert.equal(p.shiny,before.shiny);
});
test('regional evolutions require matching form and conditions',()=>{
 const p=createPokemon(52,{level:28});assert.equal(availableLaterEvolutions(p,{trigger:'level-up'}).some(x=>x.to===863),false);
});
test('special trigger cannot be accidentally bypassed',()=>{
 const p=createPokemon(123,{level:55});assert.equal(availableLaterEvolutions(p,{trigger:'level-up'}).some(x=>x.to===900),false);
});
