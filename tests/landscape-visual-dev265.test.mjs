import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {brookBankCells} from '../src/landscape.js';
test('dev.265 decorative details preserve map walkability',()=>{
 const before=Object.fromEntries(Object.entries(maps).map(([id,m])=>[id,[...m.walls].sort().join('|')]));
 const m=maps[{263:'route1',264:'village',265:'brook',266:'route2',267:'beerendorf'}[265]];
 const details=brookBankCells(m);
 assert.ok(Array.isArray(details));
 for(const [id,map] of Object.entries(maps))assert.equal([...map.walls].sort().join('|'),before[id]);
});
