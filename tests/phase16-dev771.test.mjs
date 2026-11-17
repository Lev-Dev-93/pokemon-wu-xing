import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {YARD_ASSETS,drawYardTree,drawYardPond,drawYardPathEdge} from '../src/yard-sprite-assets.js';
const root=new URL('../',import.meta.url);
test('dev771 new sprite atlas paths point to valid PNG files',()=>{
 for(const key of ['trees','pond','pathEdges']){
  const bytes=readFileSync(new URL(YARD_ASSETS[key].replace('./',''),root));
  assert.equal(bytes.subarray(1,4).toString(),'PNG');
 }
});
test('dev771 sprite functions fall back without canvas/image loading',()=>{
 assert.equal(drawYardTree({},0,0),false);
 assert.equal(drawYardPond({}),false);
 assert.equal(drawYardPathEdge({},7,10,4),false);
});
test('dev771 pond is unchanged in map topology',async()=>{
 const {yardPondCells}=await import('../src/yard-biome-art.js');
 assert.deepEqual(yardPondCells,[[2,8],[3,8],[4,8],[2,9],[3,9],[4,9]]);
});
