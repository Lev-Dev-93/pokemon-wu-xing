import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
test('dev.355: Inventar: Gegenstände ohne Mengenüberlauf hinzufügen',()=>{
const e=new Engine();e.state.inventory=[{id:'potion',quantity:Number.MAX_SAFE_INTEGER}];assert.equal(e.addItem('potion',1),false);assert.equal(e.state.inventory[0].quantity,Number.MAX_SAFE_INTEGER);
});
