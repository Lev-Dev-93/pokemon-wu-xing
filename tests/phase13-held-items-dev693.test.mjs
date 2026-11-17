import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon,validatePokemon} from '../src/team.js';
import {getMove} from '../src/moves.js';
import {heldDamageMultiplier,validHeldBattleItem} from '../src/held-battle-items.js';
import {startBattle,playTurn} from '../src/battle.js';
const physical=getMove(33),special=getMove(52);
test('Gültige getragene Kampfitems bleiben in Pokémon-Daten erhalten',()=>{
 const p=createPokemon(1,{heldItemId:'muscle-band'});
 assert.equal(p.heldItemId,'muscle-band');assert.equal(validatePokemon(p),true);
 assert.equal(validatePokemon({...p,heldItemId:'fake-item'}),false);
 assert.equal(validHeldBattleItem(null),true);
 assert.throws(()=>createPokemon(1,{heldItemId:'fake-item'}));
});
test('Muskelband stärkt nur physische Attacken',()=>{
 assert.equal(heldDamageMultiplier({heldItemId:'muscle-band'},physical,1),1.1);
 assert.equal(heldDamageMultiplier({heldItemId:'muscle-band'},special,1),1);
});
test('Schlauglas stärkt nur Spezialattacken',()=>{
 assert.equal(heldDamageMultiplier({heldItemId:'wise-glasses'},special,1),1.1);
 assert.equal(heldDamageMultiplier({heldItemId:'wise-glasses'},physical,1),1);
});
test('Expertengurt stärkt ausschließlich sehr effektive Treffer',()=>{
 assert.equal(heldDamageMultiplier({heldItemId:'expert-belt'},special,2),1.2);
 assert.equal(heldDamageMultiplier({heldItemId:'expert-belt'},special,1),1);
 assert.equal(heldDamageMultiplier({heldItemId:'expert-belt'},special,0),1);
});
test('Kein Item oder Statusattacke liefert keinen Bonus',()=>{
 assert.equal(heldDamageMultiplier({},physical,2),1);
 assert.equal(heldDamageMultiplier({heldItemId:'expert-belt'},getMove(14),2),1);
});
function strike(item,move=33,enemySpecies=4){
 const p=createPokemon(1,{level:50,...(item?{heldItemId:item}:{})});const e=createPokemon(enemySpecies,{level:50});
 p.moves=[move];e.moves=[150];const b=startBattle(p,e);
 b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;
 b.player.pp=[20];b.opponent.pp=[20];
 const before=b.opponent.pokemon.currentHp;
 playTurn(b,0,0,{rng:()=>0.5});
 return before-b.opponent.pokemon.currentHp;
}
test('Muskelband erhöht echten Kampfschaden',()=>assert.ok(strike('muscle-band')>strike(null)));
test('Schlauglas erhöht echten Spezialschaden',()=>assert.ok(strike('wise-glasses',52)>strike(null,52)));
test('Expertengurt wirkt im Kampf bei effektivem Treffer',()=>assert.ok(strike('expert-belt',52,1)>strike(null,52,1)));
