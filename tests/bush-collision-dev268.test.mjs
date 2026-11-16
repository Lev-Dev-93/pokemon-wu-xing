import test from 'node:test';import assert from 'node:assert/strict';
import {maps,canMove,forestTreeCells} from '../src/maps.js';
import {landscapeDetails} from '../src/landscape.js';
test('Sichtbare Beerenbüsche sind wie Bäume unpassierbar',()=>{const map=maps.beerendorf;const bushes=landscapeDetails(map).filter(d=>d.type==='berryBush');assert.ok(bushes.length>0);assert.deepEqual(new Set(bushes.map(d=>`${d.x},${d.y}`)),map.landscapeBushes);for(const {x,y} of bushes){assert.ok(map.walls.has(`${x},${y}`));assert.equal(canMove(map,x-1,y,x,y),false);}});
test('Bäume bleiben unpassierbar',()=>{for(const id of ['waldrand','route2'])for(const [x,y] of forestTreeCells(id))assert.ok(maps[id].walls.has(`${x},${y}`));});
test('Alle Portale und Ankunftspositionen bleiben frei',()=>{for(const map of Object.values(maps))for(const p of map.portals){assert.ok(!map.walls.has(`${p.x},${p.y}`));assert.ok(!maps[p.target].walls.has(`${p.tx},${p.ty}`));}});
