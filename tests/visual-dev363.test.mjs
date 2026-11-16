import test from 'node:test';
import assert from 'node:assert/strict';
import {objectHighlight} from '../src/visual-details.js';
test('dev.363: Lichtakzente an PC und Vorratskiste',()=>{const calls=[];const c={fillStyle:'',fillRect(...args){calls.push(args)}};objectHighlight(...[c,32,64,'pc']);assert.ok(calls.length>0);assert.ok(calls.every(a=>a.every(Number.isFinite)));});
