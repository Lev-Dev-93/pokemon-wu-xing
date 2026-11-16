import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {createPokemon} from '../src/team.js';
import {useRevive,useFullRestore,REVIVE_ITEM,FULL_RESTORE_ITEM} from '../src/healing.js';
import {shopItem} from '../src/shop.js';

test('Beleber wirkt nur bei 0 KP und stellt halbe maximale KP wieder her',()=>{const p=createPokemon(1);p.currentHp=0;p.status='poison';assert.equal(useRevive(p),true);assert.equal(p.currentHp,Math.max(1,Math.floor(p.stats.hp/2)));assert.equal(p.status,'healthy');assert.equal(useRevive(p),false)});
test('Top-Genesung heilt KP und Status, aber belebt nicht wieder',()=>{const p=createPokemon(4);p.currentHp=0;assert.equal(useFullRestore(p),false);p.currentHp=1;p.status='burn';assert.equal(useFullRestore(p),true);assert.equal(p.currentHp,p.stats.hp);assert.equal(p.status,'healthy');assert.equal(useFullRestore(p),false)});
test('Beutel: erfolgreiche Wiederbelebung wird gespeichert und verbraucht genau einen Gegenstand',()=>{const e=new Engine();e.state.team=[createPokemon(1)];e.state.team[0].currentHp=0;e.addItem(REVIVE_ITEM,2);assert.equal(e.useRecoveryOn(REVIVE_ITEM,0),true);assert.equal(e.inventory.find(i=>i.id===REVIVE_ITEM).quantity,1);assert.equal(JSON.parse(e.save()).state.team[0].currentHp,Math.max(1,Math.floor(e.team[0].stats.hp/2)));assert.equal(e.useRecoveryOn(REVIVE_ITEM,0),false)});
test('Beutel: Top-Genesung heilt und ungültiger Versuch verbraucht nichts',()=>{const e=new Engine();e.state.team=[createPokemon(1)];e.addItem(FULL_RESTORE_ITEM,1);assert.equal(e.useRecoveryOn(FULL_RESTORE_ITEM,0),false);assert.equal(e.inventory[0].quantity,1);e.state.team[0].currentHp=1;e.state.team[0].status='paralysis';assert.equal(e.useRecoveryOn(FULL_RESTORE_ITEM,0),true);assert.equal(e.team[0].status,'healthy');assert.equal(e.inventory.length,0)});
test('Neue Heilmittel sind im Laden mit vorläufigen Preisen erhältlich',()=>{assert.equal(shopItem(REVIVE_ITEM).price,120);assert.equal(shopItem(FULL_RESTORE_ITEM).price,180)});
