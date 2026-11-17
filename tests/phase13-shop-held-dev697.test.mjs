import test from 'node:test';
import assert from 'node:assert/strict';
import {SHOP_STOCK,canPurchase} from '../src/shop.js';
import {HELD_BATTLE_ITEMS} from '../src/held-battle-items.js';
import {Engine} from '../src/engine.js';
import {createPokemon} from '../src/team.js';

const held=SHOP_STOCK.filter(item=>Object.hasOwn(HELD_BATTLE_ITEMS,item.id));
test('Alle sechs getragenen Kampfitems sind im Dorfladen verfügbar',()=>{assert.equal(held.length,6);assert.deepEqual(new Set(held.map(i=>i.id)),new Set(Object.keys(HELD_BATTLE_ITEMS)))});
test('Kampfitem-Preise sind positive ganze Zahlen und Namen stammen aus dem Itemkatalog',()=>{for(const item of held){assert.ok(Number.isSafeInteger(item.price)&&item.price>0);assert.equal(item.name,HELD_BATTLE_ITEMS[item.id].name)}});
test('Kampfitems unterliegen denselben Kauf- und Geldregeln',()=>{for(const item of held){assert.equal(canPurchase({money:item.price},item.id),true);assert.equal(canPurchase({money:item.price-1},item.id),false);assert.equal(canPurchase({money:item.price},item.id,2),false)}});
test('Kampfitem-Kauf, Ausrüsten und Speichern funktionieren zusammen',()=>{const e=new Engine();e.mode='exploration';e.state.mapId='village';e.state.flags.route1_hatched=true;e.state.money=10000;e.state.team=[createPokemon(1)];const item=held.find(x=>x.id==='leftovers');assert.equal(e.buyItem(item.id),true);assert.equal(e.equipHeldItem(item.id,0),true);assert.equal(e.state.team[0].heldItemId,item.id);assert.equal(e.inventory.find(x=>x.id===item.id)?.quantity||0,0);assert.equal(JSON.parse(e.save()).state.team[0].heldItemId,item.id)});
test('Ein zweiter Kauf und Itemwechsel geben altes Item in den Beutel zurück',()=>{const e=new Engine();e.mode='exploration';e.state.mapId='village';e.state.flags.route1_hatched=true;e.state.money=10000;e.state.team=[createPokemon(1)];assert.equal(e.buyItem('leftovers'),true);assert.equal(e.buyItem('life-orb'),true);assert.equal(e.equipHeldItem('leftovers',0),true);assert.equal(e.equipHeldItem('life-orb',0),true);assert.equal(e.state.team[0].heldItemId,'life-orb');assert.equal(e.inventory.find(x=>x.id==='leftovers')?.quantity,1)});
