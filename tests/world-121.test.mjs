import test from 'node:test';import assert from 'node:assert/strict';
import {maps,npcs,forestTreeCells,canMove} from '../src/maps.js';
import {auditWorld,auditWalkablePortals} from '../src/world-integrity.js';
test('Beerendorf hat Werkstatt, Kräuterladen, Kräuterhexe und Wohnhaus',()=>{
 for(const id of ['beerendorf_werkstatt','beerendorf_haus2','beerendorf_haus','beerendorf_wohnhaus'])assert.ok(maps.beerendorf.portals.some(p=>p.target===id));
 assert.equal(npcs.beerendorf_haus[0].id,'herbal_witch');
});
test('Waldälteste wohnt in einer betretbaren Hütte',()=>{assert.equal(npcs.forest_elder_house[0].id,'forest_elder');assert.ok(maps.route2.portals.some(p=>p.target==='forest_elder_house'));});
test('Alle gezeichneten Baumgruppen sind unpassierbar',()=>{
 for(const id of ['route2','waldrand'])for(const [x,y] of forestTreeCells(id)){
  assert.ok(maps[id].walls.has(`${x},${y}`));assert.equal(canMove(maps[id],7,7,x,y),false);
 }
});
test('Alle Portale und Spawnpunkte bleiben nutzbar',()=>{assert.deepEqual(auditWorld(),[]);assert.deepEqual(auditWalkablePortals(),[])});
