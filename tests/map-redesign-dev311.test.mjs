import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,outdoorBuildings,forestTreeCells,auditBuildingApproaches,auditCardinalWorld} from '../src/maps.js';
import {isSettlementRoad} from '../src/path-geometry.js';
for(const id of ['village','professor_clearing','beerendorf'])test(`${id}: neue Hauspositionen mit freien, verbundenen Zugängen`,()=>{
 const m=maps[id];
 for(const b of outdoorBuildings[id])for(let y=b.y;y<b.y+b.h;y++)for(let x=b.x;x<b.x+b.w;x++)assert.ok(m.walls.has(`${x},${y}`));
 for(const p of m.portals.filter(p=>p.kind==='door')){
  assert.ok(!m.walls.has(`${p.x},${p.y}`));
  assert.ok(isSettlementRoad(id,p.x,p.y));
  assert.ok(isSettlementRoad(id,p.x,p.y+1));
 }
});
test('Mu: symmetrische Hausreihen mit freien Achsen',()=>{
 const b=outdoorBuildings.village;assert.deepEqual(b.map(h=>h.y),[4,4,10,10]);
 for(let x=0;x<22;x++)assert.ok(!maps.village.walls.has(`${x},7`));
});
test('Alter Wald: symmetrische Baumsaeume ohne Baeume auf der Durchgangsstrasse',()=>{
 const trees=forestTreeCells('route2');for(const [x,y] of trees){assert.notEqual(y,8);assert.ok(maps.route2.walls.has(`${x},${y}`));}
});
test('Neue Kartenordnung erhaelt Weltverbindungen und Haustuerzugang',()=>{
 assert.deepEqual(auditBuildingApproaches(),[]);assert.deepEqual(auditCardinalWorld(),[]);
});
