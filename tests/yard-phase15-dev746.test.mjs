import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {yardHabitatPatches,yardHabitatPixels,yardPondCells,yardPondEdge,yardPondSet,yardWater} from '../src/yard-biome-art.js';
const map=maps.yard;
const context=()=>({fillStyle:'',ops:[],fillRect(x,y,w,h){this.ops.push([x,y,w,h,this.fillStyle])}});
test('dev746 pond is a connected two-row, three-column water body',()=>{
 assert.equal(yardPondCells.length,6);
 for(const [x,y] of yardPondCells){assert.ok(yardPondSet.has(`${x},${y}`));assert.ok(map.walls.has(`${x},${y}`));}
});
test('dev746 shoreline only on external boundaries',()=>{
 assert.equal(yardPondEdge(2,8,1,0),false);
 assert.equal(yardPondEdge(3,8,0,1),false);
 assert.equal(yardPondEdge(2,8,-1,0),true);
 assert.equal(yardPondEdge(4,9,1,0),true);
});
test('dev746 pond animation stays in map bounds',()=>{
 for(const frame of [0,7,99]){const c=context();yardWater(c,frame);assert.ok(c.ops.length>30);
  for(const [x,y,w,h] of c.ops)assert.ok(x>=0&&y>=0&&x+w<=map.w*32&&y+h<=map.h*32);
 }
});
test('dev746 habitat patches are named and have distinct areas',()=>{
 assert.deepEqual(yardHabitatPatches.map(p=>p.kind),['flower-meadow','pasture-clover','orchard-edge']);
 assert.ok(yardHabitatPatches.every(p=>p.cells.length>=4));
});
test('dev746 habitat pixels are deterministic and within map',()=>{
 const a=yardHabitatPixels(map);assert.ok(a.length>80);assert.deepEqual(a,yardHabitatPixels(map));
 for(const p of a)assert.ok(p.x>=0&&p.y>=0&&p.x+p.w<=map.w*32&&p.y+p.h<=map.h*32);
});
test('dev746 habitat source tiles exclude water, portals and walls',()=>{
 for(const patch of yardHabitatPatches)for(const [x,y] of patch.cells){
  assert.ok(!yardPondSet.has(`${x},${y}`));assert.ok(!map.walls.has(`${x},${y}`));
  assert.ok(!map.portals.some(p=>p.x===x&&p.y===y));
 }
});
