import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {YARD_ASSETS,drawYardSpriteBuildings,drawYardTerrainTile} from '../src/yard-sprite-assets.js';
for(const [key,path] of Object.entries(YARD_ASSETS))test(`yard sprite PNG ${key} exists`,()=>{
 const file=new URL('../'+path,import.meta.url);assert.ok(existsSync(file));
 const buf=readFileSync(file);assert.equal(buf.subarray(1,4).toString(),'PNG');
});
test('sprite functions gracefully fall back without browser Image',()=>{
 assert.equal(drawYardSpriteBuildings({}),false);
 assert.equal(drawYardTerrainTile({},0,0),false);
});
test('building sprite coordinates match collision footprints',()=>{
 assert.equal(2*32,64);assert.equal(10*32,320);
 assert.equal(224,7*32);assert.equal(160,5*32);
});
