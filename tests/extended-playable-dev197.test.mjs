import test from 'node:test';import assert from 'node:assert/strict';
import {createPokemon,validatePokemon,calculateStats} from '../src/team.js';
import {getLaterEvolutionSpecies,getRegionalForms} from '../src/pokemon-extensions.js';
import {speciesTypes,getLearnset} from '../src/moves.js';
import {extendedEntry} from '../src/extended-pokemon.js';
test('later evolutions have usable stats and team validation',()=>{for(const id of getLaterEvolutionSpecies()){const p=createPokemon(id);assert.equal(validatePokemon(p),true,`species ${id}`);assert.ok(p.stats.hp>0);assert.ok(speciesTypes(id).length);}});
test('Alola and Galar variants retain species identity but have distinct battle stats',()=>{for(let species=1;species<=493;species++)for(const f of getRegionalForms(species)){if(!extendedEntry(f.pokemonId))continue;const p=createPokemon(species,{formId:f.pokemonId});assert.equal(p.speciesId,species);assert.equal(p.formId,f.pokemonId);assert.equal(validatePokemon(p),true,f.identifier);assert.deepEqual(p.stats,calculateStats(f.pokemonId,5));assert.ok(speciesTypes(species,f.pokemonId).length);}});
test('reject invalid regional form pairings',()=>{assert.throws(()=>createPokemon(1,{formId:10100}));});
test('extended level-up learnsets are available',()=>{for(const id of getLaterEvolutionSpecies())assert.ok(Array.isArray(getLearnset(id)));});
