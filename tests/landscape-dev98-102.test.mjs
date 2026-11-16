import test from 'node:test';import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';import {landscapeDetails,terrainKind} from '../src/landscape.js';
for(const id of ['route1','brook','waldrand','beerendorf','route2']){
 test(`${id}: decorations deterministic and no blocked/portal/path tiles`,()=>{
  const map=maps[id],details=landscapeDetails(map);
  assert.deepEqual(details,landscapeDetails(map));assert.ok(details.length>0);
  for(const d of details){assert.ok(d.x>0&&d.y>0&&d.x<map.w-1&&d.y<map.h-1);assert.equal(map.walls.has(`${d.x},${d.y}`),d.type==='berryBush');assert.ok(!map.portals.some(p=>p.x===d.x&&p.y===d.y));assert.equal(terrainKind(id,d.x,d.y),'grass')}
 });
}
test('brook river and bridge remain distinct',()=>{assert.equal(terrainKind('brook',0,8),'water');assert.equal(terrainKind('brook',7,8),'bridge')});
