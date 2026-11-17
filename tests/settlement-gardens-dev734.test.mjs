import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,isVillagePath,isBerryVillagePath,isProfessorClearingPath} from '../src/maps.js';
import {settlementGardenPixels} from '../src/settlement-gardens-art.js';
import {composedLandscapePixels} from '../src/landscape-composition.js';
const path=(id,x,y)=>id==='village'?isVillagePath(x,y):id==='beerendorf'?isBerryVillagePath(x,y):isProfessorClearingPath(x,y);
const yardPath=(x,y)=>(x===7&&y>=2)||(y===10&&x>=4&&x<=10);
const regions=['village','beerendorf','professor_clearing','yard'];
for(const id of regions)test(`${id}: gardens remain within safe tiles`,()=>{
 const map=maps[id],pixels=settlementGardenPixels(map,path);
 const reserved=new Set(composedLandscapePixels(map,path).map(p=>`${p.cellX},${p.cellY}`));
 const portals=new Set((map.portals||[]).map(p=>`${p.x},${p.y}`));
 for(const p of pixels){
  const {cellX:x,cellY:y}=p,key=`${x},${y}`;
  assert.ok(x>=0&&x<map.w&&y>=0&&y<map.h);
  assert.ok(p.x>=x*32&&p.y>=y*32&&p.x+p.w<=(x+1)*32&&p.y+p.h<=(y+1)*32);
  assert.ok(!map.walls.has(key)&&!portals.has(key)&&!reserved.has(key));
  assert.ok(!(id==='yard'?yardPath(x,y):path(id,x,y)));
 }
 assert.ok(pixels.length>0,`no visible garden for ${id}`);
});
test('gardens are deterministic and do not modify map data',()=>{
 const m=maps.beerendorf,originalWalls=[...m.walls],originalPortals=JSON.stringify(m.portals);
 assert.deepEqual(settlementGardenPixels(m,path),settlementGardenPixels(m,path));
 assert.deepEqual([...m.walls],originalWalls);assert.equal(JSON.stringify(m.portals),originalPortals);
});
test('unsupported maps and malformed inputs have no gardens',()=>{
 assert.deepEqual(settlementGardenPixels(maps.bedroom,path),[]);
 assert.deepEqual(settlementGardenPixels(null,path),[]);
 assert.deepEqual(settlementGardenPixels(maps.village,null),[]);
});
test('regional gardens use distinct floral palettes',()=>{
 const colors=regions.map(id=>new Set(settlementGardenPixels(maps[id],path).map(p=>p.color)));
 assert.equal(new Set(colors.map(s=>[...s].sort().join('|'))).size,regions.length);
});
