import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle} from '../src/battle.js';
import {useBattlePotion} from '../src/battle-items.js';
function setup(hp=4){const battle=startBattle(createPokemon(1,{level:5}),createPokemon(10,{level:5}));battle.player.pokemon.currentHp=hp;const inventory=[{id:'potion',quantity:2}];const removeItem=(id,n)=>{const item=inventory.find(x=>x.id===id);if(!item||item.quantity<n)return false;item.quantity-=n;return true};return {battle,inventory,removeItem}}
test('Kampftrank heilt maximal 20 KP und verbraucht einen Trank',()=>{const x=setup();const result=useBattlePotion(x.battle,x.inventory,x);assert.equal(result.ok,true);assert.equal(x.inventory[0].quantity,1);assert.equal(x.battle.player.pokemon.currentHp,Math.min(x.battle.player.pokemon.stats.hp,24));assert.match(x.battle.log[0],/Trank/)});
test('Volle KP verhindern Trankverbrauch',()=>{const x=setup();x.battle.player.pokemon.currentHp=x.battle.player.pokemon.stats.hp;assert.equal(useBattlePotion(x.battle,x.inventory,x).ok,false);assert.equal(x.inventory[0].quantity,2)});
test('Kampfunfähigkeit verhindert Trankverbrauch',()=>{const x=setup(0);assert.equal(useBattlePotion(x.battle,x.inventory,x).ok,false);assert.equal(x.inventory[0].quantity,2)});
test('Fehlender Vorrat verhindert Heilung',()=>{const x=setup();x.inventory[0].quantity=0;assert.equal(useBattlePotion(x.battle,x.inventory,x).ok,false);assert.equal(x.battle.player.pokemon.currentHp,4)});
test('Abgeschlossener Kampf erlaubt keinen Trank',()=>{const x=setup();x.battle.finished=true;assert.equal(useBattlePotion(x.battle,x.inventory,x).ok,false);assert.equal(x.inventory[0].quantity,2)});
