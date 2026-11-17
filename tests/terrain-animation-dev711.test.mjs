import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {terrainAnimationCells,terrainAnimationPhase,drawTerrainAnimation} from '../src/terrain-animation.js';

test('brook water only occupies water tiles, not bridge',()=>{
 const cells=terrainAnimationCells(maps.brook);
 assert.ok(cells.length>0);
 assert.ok(cells.every(c=>c.kind==='water'&&c.y>=7&&c.y<=9&&(c.x<6||c.x>9)));
});
test('animated grass does not cover portals or walls',()=>{
 for(const map of Object.values(maps))for(const c of terrainAnimationCells(map)){
  if(c.kind==='grass')assert.ok(!map.walls.has(`${c.x},${c.y}`));
  assert.ok(!map.portals.some(p=>p.x===c.x&&p.y===c.y));
 }
});
test('terrain animation deterministic and respects reduced motion',()=>{
 assert.deepEqual(terrainAnimationCells(maps.brook),terrainAnimationCells(maps.brook));
 assert.equal(terrainAnimationPhase(5000,true),0);
 assert.equal(terrainAnimationPhase(-100),0);
 assert.notEqual(terrainAnimationPhase(0),terrainAnimationPhase(240));
});
test('rendering does not mutate map data',()=>{
 const map=maps.brook, before=JSON.stringify({portals:map.portals,heights:map.heights,walls:[...map.walls]});
 const ctx={save(){},restore(){},fillRect(){},set fillStyle(value){this.color=value;}};
 drawTerrainAnimation(ctx,map,240);drawTerrainAnimation(ctx,map,1200,true);
 assert.equal(JSON.stringify({portals:map.portals,heights:map.heights,walls:[...map.walls]}),before);
});
