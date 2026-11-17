import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
function pngSize(path){const data=readFileSync(resolve(root,path));assert.equal(data.subarray(1,4).toString(),'PNG');return [data.readUInt32BE(16),data.readUInt32BE(20)];}
test('house PNG preserves its 7x2 tile footprint',()=>assert.deepEqual(pngSize('assets/buildings/zuechterhaus_224x64.png'),[224,64]));
test('barn PNG preserves its 5x2 tile footprint',()=>assert.deepEqual(pngSize('assets/buildings/scheune_160x64.png'),[160,64]));
test('building renderer preserves anchor points',()=>{const s=readFileSync(resolve(root,'src/yard-sprite-assets.js'),'utf8');assert.match(s,/2\*32,0,224,64/);assert.match(s,/10\*32,0,160,64/)});
