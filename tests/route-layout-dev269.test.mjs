import test from 'node:test';import assert from 'node:assert/strict';
import {maps,buildingCells,auditCardinalWorld} from '../src/maps.js';
import {walkwayCells,isWalkway,auditWalkwayNetwork} from '../src/route-layout.js';
test('Alle Außenportale sind durch kollisionsfreie Wege verbunden',()=>assert.deepEqual(auditWalkwayNetwork(maps),[]));
test('Keine Gebäude oder Büsche liegen auf den neuen Wegen',()=>{for(const id of ['village','professor_clearing','route1','brook','waldrand','beerendorf','route2']){const m=maps[id];for(const k of walkwayCells(m).cells)assert.equal(m.walls.has(k),false,`${id} ${k}`);for(const [x,y] of buildingCells(id))assert.equal(isWalkway(m,x,y),false);}});
test('Wege verbinden alle Eingänge ohne die Himmelsrichtungen zu verändern',()=>{assert.deepEqual(auditCardinalWorld(),[]);for(const id of ['village','professor_clearing','route1','brook','waldrand','beerendorf','route2'])for(const p of maps[id].portals)assert.equal(isWalkway(maps[id],p.x,p.y),true,`${id} ${p.x},${p.y}`);});
