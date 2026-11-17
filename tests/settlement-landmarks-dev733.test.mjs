import test from 'node:test';
import assert from 'node:assert/strict';
import {settlementLandmarkPixels} from '../src/settlement-landmarks-art.js';
import {maps,isVillagePath,isBerryVillagePath,isProfessorClearingPath} from '../src/maps.js';
const path=(id,x,y)=>id==='village'?isVillagePath(x,y):id==='beerendorf'?isBerryVillagePath(x,y):isProfessorClearingPath(x,y);
for(const id of ['village','beerendorf','professor_clearing','yard']){
 test(`${id}: landmark visible, deterministic and bounded to safe path`,()=>{
  const m=maps[id],before=[...m.walls],a=settlementLandmarkPixels(m,path);
  assert.ok(a.length>12);assert.deepEqual(a,settlementLandmarkPixels(m,path));assert.deepEqual([...m.walls],before);
  for(const p of a){assert.ok(p.w>0&&p.h>0);assert.ok(p.x>=p.cellX*32&&p.x+p.w<=(p.cellX+1)*32);assert.ok(p.y>=p.cellY*32&&p.y+p.h<=(p.cellY+1)*32);assert.ok(!m.walls.has(`${p.cellX},${p.cellY}`));assert.ok(!m.portals.some(q=>q.x===p.cellX&&q.y===p.cellY));if(id!=='yard')assert.ok(path(id,p.cellX,p.cellY));}
 });
}
test('regional landmark palettes differ',()=>{const colors=['village','beerendorf','professor_clearing'].map(id=>new Set(settlementLandmarkPixels(maps[id],path).map(p=>p.color)));assert.ok(colors.every((c,i)=>colors.every((d,j)=>i===j||[...c].some(color=>!d.has(color)))));});
test('unsupported and invalid maps produce no landmarks',()=>{assert.deepEqual(settlementLandmarkPixels(maps.bedroom,path),[]);assert.deepEqual(settlementLandmarkPixels(null,path),[]);});
