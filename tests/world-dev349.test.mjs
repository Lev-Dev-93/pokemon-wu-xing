import test from 'node:test';
import assert from 'node:assert/strict';
import {validateObjects} from '../src/world-validation.js';
test('dev.349 interactable objects',()=>{const w={a:{w:3,h:3}};assert.equal(validateObjects(w,{a:[{x:-1,y:1}]}).length,1);assert.deepEqual(validateObjects(w,{a:[{x:2,y:2}]}),[]);});
