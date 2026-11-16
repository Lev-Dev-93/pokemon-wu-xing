import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
test('dev.358: Speicherstand: doppelte Inventarpositionen verhindern',()=>{
const e=new Engine();e.state.inventory=[{id:'potion',quantity:1},{id:'potion',quantity:2}];const saved=e.save();assert.throws(()=>new Engine().load(saved),/Inventar/);
});
