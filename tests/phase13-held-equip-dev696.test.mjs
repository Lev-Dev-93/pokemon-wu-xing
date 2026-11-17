import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {createPokemon} from '../src/team.js';
import {bagCategory,bagName,bagTargets,applyBagItem} from '../src/bag.js';
function fixture(){const e=new Engine();e.state.team=[createPokemon(1),createPokemon(4)];e.addItem('leftovers',2);e.addItem('life-orb',1);return e;}
test('held items appear as bag category and name',()=>{assert.equal(bagCategory('leftovers'),'held');assert.equal(bagName('leftovers'),'Überreste')});
test('equipping consumes exactly one item',()=>{const e=fixture();assert.equal(e.equipHeldItem('leftovers',0),true);assert.equal(e.state.team[0].heldItemId,'leftovers');assert.equal(e.inventory.find(x=>x.id==='leftovers').quantity,1)});
test('re-equipping same item is rejected without consumption',()=>{const e=fixture();e.equipHeldItem('leftovers',0);assert.equal(e.equipHeldItem('leftovers',0),false);assert.equal(e.inventory.find(x=>x.id==='leftovers').quantity,1)});
test('swapping returns previous item to bag',()=>{const e=fixture();e.equipHeldItem('leftovers',0);assert.equal(e.equipHeldItem('life-orb',0),true);assert.equal(e.state.team[0].heldItemId,'life-orb');assert.equal(e.inventory.find(x=>x.id==='leftovers').quantity,2);assert.equal(e.inventory.some(x=>x.id==='life-orb'),false)});
test('unequipping returns item',()=>{const e=fixture();e.equipHeldItem('life-orb',0);assert.equal(e.removeHeldItem(0),true);assert.equal(e.state.team[0].heldItemId,null);assert.equal(e.inventory.find(x=>x.id==='life-orb').quantity,1)});
test('cannot equip without inventory or during battle',()=>{const e=fixture();assert.equal(e.equipHeldItem('focus-sash',0),false);e.mode='battle';assert.equal(e.equipHeldItem('leftovers',0),false);assert.equal(e.removeHeldItem(0),false)});
test('bag targets and dispatch equip held items',()=>{const e=fixture();assert.equal(bagTargets('leftovers',e.team).length,2);assert.equal(applyBagItem(e,'leftovers',bagTargets('leftovers',e.team)[1]),true);assert.equal(e.state.team[1].heldItemId,'leftovers')});
test('save and load preserve equipped item and inventory',()=>{const e=fixture();e.equipHeldItem('leftovers',0);const saved=e.save();const next=new Engine();next.load(saved);assert.equal(next.state.team[0].heldItemId,'leftovers');assert.equal(next.inventory.find(x=>x.id==='leftovers').quantity,1)});
test('invalid indices and items leave state unchanged',()=>{const e=fixture();const before=e.save();assert.equal(e.equipHeldItem('bad',0),false);assert.equal(e.equipHeldItem('leftovers',-1),false);assert.equal(e.removeHeldItem(99),false);assert.equal(e.save(),before)});
