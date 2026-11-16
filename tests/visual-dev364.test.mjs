import test from 'node:test';
import assert from 'node:assert/strict';
import {facingAccent} from '../src/visual-details.js';
test('dev.364: Richtungsabhängige Figur-Details',()=>{const calls=[];const c={fillStyle:'',fillRect(...args){calls.push(args)}};facingAccent(...[c,32,64,'down']);assert.ok(calls.length>0);assert.ok(calls.every(a=>a.every(Number.isFinite)));});
