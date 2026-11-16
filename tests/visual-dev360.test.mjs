import test from 'node:test';
import assert from 'node:assert/strict';
import {heroShadow} from '../src/visual-details.js';
test('dev.360: Bodenschatten unter der Spielfigur',()=>{const calls=[];const c={fillStyle:'',fillRect(...args){calls.push(args)}};heroShadow(...[c,32,64]);assert.ok(calls.length>0);assert.ok(calls.every(a=>a.every(Number.isFinite)));});
