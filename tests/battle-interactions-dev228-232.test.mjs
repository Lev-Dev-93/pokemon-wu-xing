import test from 'node:test';
import assert from 'node:assert/strict';
import {startBattle,playTurn} from '../src/battle.js';
import {createPokemon} from '../src/team.js';
import {getRegionalForms} from '../src/pokemon-extensions.js';
import {speciesTypes} from '../src/moves.js';
function battle(moveId, abilityId, typeSpecies=1){
 const a=createPokemon(25,{level:30}); a.moves=[moveId];
 const b=createPokemon(abilityId===31?25:422,{level:30,abilityId});b.moves=[33];
 return startBattle(a,b);
}
test('Blitzfänger absorbiert Donnerwelle als Statusattacke',()=>{
 const b=battle(86,31);playTurn(b,0,0,{rng:()=>0});
 assert.equal(b.opponent.stages.specialAttack,1);
 assert.notEqual(b.opponent.pokemon.status,'paralysis');
});
test('Regentanz löst Sturmsog nicht aus, da selbstbezogen',()=>{
 const b=battle(240,114);playTurn(b,0,0,{rng:()=>0});
 assert.equal(b.opponent.stages.specialAttack,0);
 assert.equal(b.weather,'rain');
});
test('Regionalform-Typen sind über die Kampf-Typabfrage verfügbar',()=>{
 const forms=getRegionalForms(19);assert.ok(forms.length>0);
 const f=forms.find(x=>x.identifier?.endsWith('-alola'));
 if(f)assert.notDeepEqual(speciesTypes(19,f.pokemonId),speciesTypes(19));
});
