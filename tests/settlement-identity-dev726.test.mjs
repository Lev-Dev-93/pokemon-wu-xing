import test from 'node:test';
import assert from 'node:assert/strict';
import {settlementBuildingDetails,yardBarnDetails} from '../src/settlement-identity-art.js';
import {outdoorBuildings,maps} from '../src/maps.js';
const signatures=new Map();
for(const [mapId,buildings] of Object.entries(outdoorBuildings))for(const b of buildings){
 test(`building accents remain inside ${mapId} ${b.label||'building'} (${b.x},${b.y})`,()=>{
  const parts=settlementBuildingDetails(mapId,b);
  assert.ok(parts.length>10);
  for(const p of parts){assert.ok(p.w>0&&p.h>0);assert.ok(p.x>=b.x*32&&p.y>=b.y*32);assert.ok(p.x+p.w<=(b.x+b.w)*32&&p.y+p.h<=(b.y+b.h)*32);assert.match(p.color,/^#[0-9a-f]{6}$/i)}
  assert.deepEqual(parts,settlementBuildingDetails(mapId,b));
  signatures.set(`${mapId}:${b.label||b.x}`,JSON.stringify(parts.map(p=>p.color)));
 });
}
test('settlement palettes are visually distinct',()=>{
 const b={x:2,y:2,w:3,h:2,label:'HAUS'};
 assert.notDeepEqual(settlementBuildingDetails('village',b),settlementBuildingDetails('beerendorf',b));
 assert.notDeepEqual(settlementBuildingDetails('beerendorf',b),settlementBuildingDetails('professor_clearing',b));
});
test('building types have distinct geometry',()=>{
 const b={x:2,y:2,w:3,h:2};
 const types=['WERKST.','LADEN','KAPELLE','RIVALE','HAUS'];
 assert.equal(new Set(types.map(label=>JSON.stringify(settlementBuildingDetails('beerendorf',{...b,label})))).size,types.length);
});
test('other maps and invalid buildings are not decorated',()=>{
 assert.deepEqual(settlementBuildingDetails('bedroom',{x:1,y:1,w:3,h:2}),[]);
 assert.deepEqual(settlementBuildingDetails('beerendorf',{x:1,y:1,w:1,h:2}),[]);
 assert.deepEqual(settlementBuildingDetails('beerendorf',null),[]);
});
test('barn accents remain in the existing barn footprint',()=>{
 const parts=yardBarnDetails();assert.ok(parts.length>20);
 for(const p of parts){assert.ok(p.x>=32&&p.x+p.w<=224&&p.y>=0&&p.y+p.h<=64)}
 assert.deepEqual(parts,yardBarnDetails());
});
test('visual module does not mutate map geometry',()=>{
 const before=Object.fromEntries(['yard','village','beerendorf'].map(id=>[id,[...maps[id].walls].sort()]));
 for(const [id,buildings] of Object.entries(outdoorBuildings))for(const b of buildings)settlementBuildingDetails(id,b);
 yardBarnDetails();
 assert.deepEqual(Object.fromEntries(['yard','village','beerendorf'].map(id=>[id,[...maps[id].walls].sort()])),before);
});
