import test from 'node:test';import assert from 'node:assert/strict';
import {maps,outdoorBuildings,forestTreeCells,auditCardinalWorld,auditBuildingApproaches,auditVisibleObstacles} from '../src/maps.js';
import {auditWalkwayNetwork} from '../src/route-layout.js';
import {terrainKind} from '../src/landscape.js';
for(const id of ['village','professor_clearing','beerendorf'])test(`${id}: neu geordnete spiegelnde Hausparzellen`,()=>{
 const buildings=outdoorBuildings[id],map=maps[id];assert.equal(buildings.length,id==='professor_clearing'?2:4);
 for(const b of buildings)assert.ok(buildings.some(other=>other.y===b.y&&other.x===map.w-b.x-b.w));
 for(const door of map.portals.filter(p=>p.kind==='door')){assert.ok(!map.walls.has(`${door.x},${door.y}`));assert.equal(terrainKind(id,door.x,door.y),'path');}
});
for(const id of ['route1','brook','waldrand','route2'])test(`${id}: durchgaengige neue Reiseroute`,()=>{
 const map=maps[id];for(const p of map.portals.filter(p=>p.kind==='path'))assert.ok(!map.walls.has(`${p.x},${p.y}`));
});
test('Neuplanung: Weltgeografie, Gebaeude, Baeume und Wege kollisionsfrei',()=>{
 assert.deepEqual(auditCardinalWorld(),[]);assert.deepEqual(auditBuildingApproaches(),[]);assert.deepEqual(auditVisibleObstacles(),[]);assert.deepEqual(auditWalkwayNetwork(maps),[]);
 for(const id of ['waldrand','route2'])for(const [x,y] of forestTreeCells(id))assert.ok(maps[id].walls.has(`${x},${y}`));
});
