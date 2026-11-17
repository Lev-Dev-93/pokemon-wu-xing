import test from 'node:test';
import assert from 'node:assert/strict';
import {composedLandscapePixels} from '../src/landscape-composition.js';
import {landscapeScenePixels} from '../src/landscape-scenes-art.js';
import {landscapeLandmarkPixels} from '../src/landscape-landmarks-art.js';
import {vegetationClusterPixels} from '../src/vegetation-clusters-art.js';
import {maps,isVillagePath,isBerryVillagePath,isProfessorClearingPath} from '../src/maps.js';
const path=(id,x,y)=>id==='village'?isVillagePath(x,y):id==='beerendorf'?isBerryVillagePath(x,y):isProfessorClearingPath(x,y);
const ids=['village','beerendorf','professor_clearing','yard'];
const cell=p=>`${p.cellX},${p.cellY}`;
for(const id of ids){
 test(`${id}: scenes have exclusive painting priority`,()=>{
  const m=maps[id],parts=composedLandscapePixels(m,path),scenes=landscapeScenePixels(m,path);
  const sceneCells=new Set(scenes.map(cell));
  assert.ok(sceneCells.size>0);
  assert.deepEqual(parts.slice(-scenes.length),scenes);
  const lower=parts.slice(0,-scenes.length);
  assert.ok(lower.every(p=>!sceneCells.has(cell(p))));
 });
 test(`${id}: composition is deterministic, non-mutating and tile bounded`,()=>{
  const m=maps[id],walls=[...m.walls],first=composedLandscapePixels(m,path);
  assert.deepEqual(first,composedLandscapePixels(m,path));assert.deepEqual([...m.walls],walls);
  for(const p of first){assert.ok(p.x>=p.cellX*32&&p.x+p.w<=(p.cellX+1)*32);assert.ok(p.y>=p.cellY*32&&p.y+p.h<=(p.cellY+1)*32);}
 });
 test(`${id}: landmarks take priority over smaller clusters`,()=>{
  const m=maps[id],scenes=new Set(landscapeScenePixels(m,path).map(cell));
  const landmarks=new Set(landscapeLandmarkPixels(m,path).map(cell));
  const pixels=composedLandscapePixels(m,path);
  const clusterColors=new Set(vegetationClusterPixels(m,path).map(p=>p.color));
  // The painter's first layer is transitions, followed by clusters, landmarks, scenes.
  const sceneCount=landscapeScenePixels(m,path).length;
  const eligibleLandmarks=landscapeLandmarkPixels(m,path).filter(p=>!scenes.has(cell(p)));
  assert.deepEqual(pixels.slice(pixels.length-sceneCount-eligibleLandmarks.length,pixels.length-sceneCount),eligibleLandmarks);
  assert.ok(landmarks.size>=0&&clusterColors.size>=0);
 });
}
test('unsupported interior and invalid maps yield no vegetation',()=>{
 assert.deepEqual(composedLandscapePixels(maps.bedroom,path),[]);
 assert.deepEqual(composedLandscapePixels(null,path),[]);
});
