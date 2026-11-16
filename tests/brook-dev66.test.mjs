import test from 'node:test';import assert from 'node:assert/strict';import {maps,canMove} from '../src/maps.js';import {Engine} from '../src/engine.js';
test('Route 1 leads to brook and brook to forest',()=>{assert.equal(maps.route1.portals.at(-1).target,'brook');assert.equal(maps.brook.portals.at(-1).target,'route2');assert.equal(maps.route2.portals[0].target,'brook')});
test('stream impassable outside bridge',()=>{assert.equal(canMove(maps.brook,5,6,5,7),false);assert.equal(canMove(maps.brook,7,6,7,7),true)});
test('brook visit recorded',()=>{const e=new Engine();e.state.mapId='route1';e.state.flags.route1_hatched=true;e.transition(maps.route1.portals.at(-1));assert.equal(e.state.mapId,'brook');assert.equal(e.state.flags.visitedBrook,true)});
