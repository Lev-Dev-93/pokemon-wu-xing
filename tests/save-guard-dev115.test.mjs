import test from 'node:test';import assert from 'node:assert/strict';import {Engine} from '../src/engine.js';
test('defekte Speicherdaten überschreiben den aktiven Spielstand nicht',()=>{
 const e=new Engine();const before=e.save();
 for(const raw of ['{',JSON.stringify({schema:999,state:{}}),JSON.stringify({schema:7,state:{...e.state,mapId:'unknown'}})]){
 assert.throws(()=>e.load(raw));assert.equal(e.save(),before);
 }
});
test('Spielstand lässt sich ohne Fortschrittsverlust laden',()=>{
 const e=new Engine(),save=e.save(),other=new Engine();other.load(save);assert.deepEqual(other.state,e.state);
});
