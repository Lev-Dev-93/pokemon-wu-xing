import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
test('Engine meldet Waldkampf nur als Bereitschaft',()=>{const e=new Engine();assert.equal(e.forestEncounterReadiness.ready,false);assert.equal(e.canPrepareForestBattle(null),false);assert.equal(e.pendingTrainer,null)});
