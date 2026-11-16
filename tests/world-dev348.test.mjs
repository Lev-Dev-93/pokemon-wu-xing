import test from 'node:test';
import assert from 'node:assert/strict';
import {validateActors} from '../src/world-validation.js';
test('dev.348 npc placement',()=>{const w={a:{w:3,h:3,walls:new Set(['1,1'])}};assert.equal(validateActors(w,{a:[{x:1,y:1}]}).length,1);assert.deepEqual(validateActors(w,{a:[{x:2,y:1}]}),[]);});
