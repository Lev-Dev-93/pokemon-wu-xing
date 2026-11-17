import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {YARD_ASSETS,YARD_FARM_PROPS,drawYardFarmProps} from '../src/yard-sprite-assets.js';
import {maps} from '../src/maps.js';
test('dev776 farm prop atlas is a valid transparent PNG',()=>{
 const b=readFileSync(new URL('../assets/tilesets/yard_farm_props_32.png',import.meta.url));
 assert.equal(b.subarray(1,4).toString(),'PNG');
 assert.equal(b.readUInt32BE(16),128);assert.equal(b.readUInt32BE(20),64);
 assert.match(YARD_ASSETS.farmProps,/yard_farm_props_32.png$/);
});
test('dev776 props stay outside doors, fences, paths and pond',()=>{
 const cells=new Set();
 for(const [x,y,index] of YARD_FARM_PROPS){
  assert.ok(x>=0&&x<maps.yard.w&&y>=0&&y<maps.yard.h);
  assert.ok(index>=0&&index<8);
  assert.ok(!maps.yard.walls.has(`${x},${y}`));
  assert.ok(!(x===7&&y>=2));
  assert.ok(!(y===10&&x>=4&&x<=10));
  assert.ok(!(x>=9&&x<=14&&y>=4&&y<=8));
  assert.ok(!(x>=2&&x<=4&&y>=8&&y<=9));
  assert.ok(!cells.has(`${x},${y}`));cells.add(`${x},${y}`);
 }
});
test('dev776 sprite drawing remains safe without browser Image',()=>{
 assert.equal(drawYardFarmProps({drawImage(){}},maps.yard),0);
 assert.equal(drawYardFarmProps({},maps.yard),0);
});
