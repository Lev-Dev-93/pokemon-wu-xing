import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {terrainEdgeMask} from '../src/landscape.js';
test('dev.263 decorative details preserve map walkability',()=>{
 const before=Object.fromEntries(Object.entries(maps).map(([id,m])=>[id,[...m.walls].sort().join('|')]));
 const m=maps[{263:'route1',264:'village',265:'brook',266:'route2',267:'beerendorf'}[263]];
 const details=terrainEdgeMask(m,7,8);
 assert.ok(Number.isInteger(details)&&details>=0&&details<=15);
 for(const [id,map] of Object.entries(maps))assert.equal([...map.walls].sort().join('|'),before[id]);
});
