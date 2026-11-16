import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
test('dev.356: Inventar: ungültige Gegenstandskennungen beim Entfernen zurückweisen',()=>{
const e=new Engine();assert.equal(e.removeItem('',1),false);assert.equal(e.removeItem(null,1),false);
});
