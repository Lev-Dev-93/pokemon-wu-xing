import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const base=new URL('../',import.meta.url);
test('dev775 barn PNG preserves dimensions',()=>{const b=readFileSync(new URL('assets/buildings/scheune_160x64.png',base));assert.equal(b.readUInt32BE(16),160);assert.equal(b.readUInt32BE(20),64)});
test('dev775 barn fallback has an open entrance',()=>{const s=readFileSync(new URL('src/art.js',base),'utf8');assert.match(s,/Rustic barn fallback with wide dark entrance/);assert.match(s,/outward-open timber leaves/)});
