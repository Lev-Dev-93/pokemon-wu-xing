import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {createPokemon} from '../src/team.js';
import {captureDecision,commitCapture} from '../src/capture-transaction.js';
function setup(){const engine=new Engine();engine.addItem('poke-ball',3);const pokemon=createPokemon(10);return {engine,pokemon};}
test('Fangerfolg kann nicht doppelt verbucht werden',()=>{const {engine,pokemon}=setup();const decision=captureDecision({pokemon,inventory:engine.inventory,team:engine.team,storage:engine.storage,rng:()=>0});assert.equal(decision.caught,true);assert.equal(commitCapture(engine,pokemon,decision),true);assert.equal(commitCapture(engine,pokemon,decision),false);assert.equal(engine.team.length,1);assert.equal(engine.inventory.find(i=>i.id==='poke-ball').quantity,2)});
test('Fehlversuch verbraucht bei wiederholtem Handler nur einen Ball',()=>{const {engine,pokemon}=setup();const decision=captureDecision({pokemon,inventory:engine.inventory,team:engine.team,storage:engine.storage,rng:()=>0.999});assert.equal(decision.caught,false);assert.equal(commitCapture(engine,pokemon,decision),true);assert.equal(commitCapture(engine,pokemon,decision),false);assert.equal(engine.inventory.find(i=>i.id==='poke-ball').quantity,2)});
test('Abgelehnte Entscheidung kann nicht verbucht werden',()=>{const {engine,pokemon}=setup();assert.equal(commitCapture(engine,pokemon,{attempted:false,caught:true}),false);assert.equal(engine.inventory.find(i=>i.id==='poke-ball').quantity,3)});
