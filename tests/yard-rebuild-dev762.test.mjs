import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,canMove} from '../src/maps.js';
import {yardHabitatPatches} from '../src/yard-biome-art.js';
const yard=maps.yard;
test('dev762 house roof and facade block movement except the integrated door',()=>{
 for(let x=2;x<=8;x++)assert.ok(yard.walls.has(`${x},0`));
 for(let x=2;x<=8;x++)if(x!==7)assert.ok(yard.walls.has(`${x},1`));
 assert.ok(!yard.walls.has('7,1'));
 assert.ok(yard.portals.some(p=>p.x===7&&p.y===1&&p.target==='ground'));
 assert.equal(canMove(yard,6,2,6,1),false);
});
test('dev762 independent barn has solid roof and walls',()=>{
 for(let x=1;x<=4;x++)for(let y=3;y<=4;y++)assert.ok(yard.walls.has(`${x},${y}`));
});
test('dev762 story entrances and baby habitats remain usable',()=>{
 assert.ok(yard.portals.some(p=>p.x===7&&p.y===11&&p.target==='village'));
 for(const patch of yardHabitatPatches)for(const [x,y] of patch.cells)assert.ok(!yard.walls.has(`${x},${y}`));
 for(const [x,y] of [[11,5],[12,6],[5,8]])assert.ok(!yard.walls.has(`${x},${y}`));
});
