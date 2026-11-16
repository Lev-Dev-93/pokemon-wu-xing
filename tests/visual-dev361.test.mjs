import test from 'node:test';
import assert from 'node:assert/strict';
import {npcShadow} from '../src/visual-details.js';
test('dev.361: Bodenschatten für NPCs',()=>{const calls=[];const c={fillStyle:'',fillRect(...args){calls.push(args)}};npcShadow(...[c,2,3]);assert.ok(calls.length>0);assert.ok(calls.every(a=>a.every(Number.isFinite)));});
