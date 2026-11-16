import test from 'node:test';
import assert from 'node:assert/strict';
import {waterGlint} from '../src/visual-details.js';
test('dev.362: Dezente Reflexe auf Wasserflächen',()=>{const calls=[];const c={fillStyle:'',fillRect(...args){calls.push(args)}};waterGlint(...[c,32,64,3]);assert.ok(calls.length>0);assert.ok(calls.every(a=>a.every(Number.isFinite)));});
