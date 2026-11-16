import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle} from '../src/battle.js';
import {STATUS_REMEDIES} from '../src/healing.js';
import {useBattleRemedy} from '../src/battle-items.js';
function setup(status='poison'){const battle=startBattle(createPokemon(1,{level:5}),createPokemon(10,{level:5}));battle.player.pokemon.status=status;const inventory=[{id:'antidote',quantity:2}];const removeItem=(id,n)=>{const item=inventory.find(x=>x.id===id);if(!item||item.quantity<n)return false;item.quantity-=n;return true};return {battle,inventory,removeItem}}
test('Gegengift heilt im Kampf und wird verbraucht',()=>{const x=setup();assert.equal(useBattleRemedy(x.battle,x.inventory,'antidote',x).ok,true);assert.equal(x.battle.player.pokemon.status,'healthy');assert.equal(x.inventory[0].quantity,1)});
test('Falscher Status verbraucht nichts',()=>{const x=setup('burn');assert.equal(useBattleRemedy(x.battle,x.inventory,'antidote',x).ok,false);assert.equal(x.inventory[0].quantity,2)});
test('Fehlendes Mittel verbraucht nichts',()=>{const x=setup();x.inventory[0].quantity=0;assert.equal(useBattleRemedy(x.battle,x.inventory,'antidote',x).ok,false)});
test('Kampfunfähiges Pokémon kann nicht behandelt werden',()=>{const x=setup();x.battle.player.pokemon.currentHp=0;assert.equal(useBattleRemedy(x.battle,x.inventory,'antidote',x).ok,false)});
test('Nach Kampfende keine Statusheilmittel',()=>{const x=setup();x.battle.finished=true;assert.equal(useBattleRemedy(x.battle,x.inventory,'antidote',x).ok,false)});
test('Alle fünf Statusheilmittel im Kampf nutzbar',()=>{for(const r of STATUS_REMEDIES){const x=setup(r.status);x.inventory.splice(0,x.inventory.length,{id:r.id,quantity:1});assert.equal(useBattleRemedy(x.battle,x.inventory,r.id,x).ok,true,r.name);assert.equal(x.battle.player.pokemon.status,'healthy')}});
test('Unbekanntes Heilmittel abgewiesen',()=>{const x=setup();assert.equal(useBattleRemedy(x.battle,x.inventory,'unknown',x).ok,false)});
