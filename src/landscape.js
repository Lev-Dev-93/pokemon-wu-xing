import {isWalkway} from './route-layout.js';
// Deterministic, purely visual biome details. No collision or encounter changes.
export const landscapeBiomes = Object.freeze({route1:'meadow',brook:'riverside',waldrand:'edge',beerendorf:'hamlet',route2:'ancientForest'});
// Sichtbare Hauptwege orientieren sich an den tatsächlichen Kartenübergängen.
export function isTravelPath(mapId,x,y){
 if(mapId==='route1')return (y>=6&&y<=8)||(x>=6&&x<=9&&y>=6&&y<=12);
 if(mapId==='brook')return (y===6)||(x>=6&&x<=9&&y>=6&&y<=15);
 if(mapId==='waldrand')return (x>=6&&x<=9&&y<=8)||(y>=7&&y<=9&&x>=7);
 if(mapId==='route2')return (y===8)||(x>=6&&x<=9);
 return false;
}
export function terrainKind(mapId,x,y){
 if(mapId==='brook'&&y>=7&&y<=9)return x>=6&&x<=9?'bridge':'water';
 if(mapId==='beerendorf'&&((x>=6&&x<=9)||(y===7&&x>=4&&x<=13)))return 'path';
 if(['route1','brook','waldrand','route2'].includes(mapId)&&isTravelPath(mapId,x,y))return 'path';
 return 'grass';
}
export function landscapeDetails(map){
 const biome=landscapeBiomes[map.id];if(!biome)return [];
 const protectedCells=new Set([...map.portals.map(q=>`${q.x},${q.y}`),...(map.landscapeArrivalCells||[]),...map.portals.filter(p=>p.kind==='door').map(p=>`${p.x},${p.y+1}`)]);
 const result=[];
 for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  if((map.walls.has(`${x},${y}`)&&!map.landscapeBushes?.has(`${x},${y}`))||protectedCells.has(`${x},${y}`)||(terrainKind(map.id,x,y)!=='grass'||(map.landscapeBushes&&isWalkway(map,x,y))))continue;
  const seed=(x*73+y*137+x*y*19+map.id.length*43)%101;
  let type=null;
  if(biome==='meadow')type=seed<13?'wildflower':seed<24?'tuft':seed===40?'stone':null;
  if(biome==='riverside')type=seed<11?'reeds':seed<19?'pebbles':seed<25?'wildflower':null;
  if(biome==='edge')type=seed<20?'fern':seed<30?'tuft':seed<34?'mushroom':null;
  if(biome==='hamlet')type=seed<37?'berryBush':seed<43?'wildflower':seed<46?'stone':null;
  if(biome==='ancientForest')type=seed<24?'fern':seed<37?'mushroom':seed<44?'roots':null;
  if(type)result.push({x,y,type});
 }
 return result;
}

// Surface edging is decorative only and is never used for collision.
export function terrainEdgeMask(map,x,y){
 const here=terrainKind(map.id,x,y);
 if(here!=='path'||map.walls.has(`${x},${y}`))return 0;
 let mask=0;for(const [dx,dy,bit] of [[0,-1,1],[1,0,2],[0,1,4],[-1,0,8]]){
  const nx=x+dx,ny=y+dy;
  if(nx<0||ny<0||nx>=map.w||ny>=map.h||terrainKind(map.id,nx,ny)!=='path')mask|=bit;
 }return mask;
}

export const villageDecorationPlan=Object.freeze({
 village:[[7,2,'flowerbed'],[15,2,'flowerbed'],[7,13,'bench'],[14,13,'bench']],
 professor_clearing:[[2,8,'researchPlot'],[12,9,'researchPlot'],[7,9,'flowerbed']],
 yard:[[1,5,'flowerbed'],[12,9,'flowerbed']]
});
export function safeVillageDecorations(map){
 return (villageDecorationPlan[map.id]||[]).filter(([x,y])=>
 x>=0&&y>=0&&x<map.w&&y<map.h&&!map.walls.has(`${x},${y}`)&&
 !map.portals.some(p=>p.x===x&&p.y===y));
}

export function brookBankCells(map){
 if(map.id!=='brook')return [];
 const cells=[];for(const y of [6,10])for(let x=0;x<map.w;x++){
  if(x>=6&&x<=9||map.walls.has(`${x},${y}`))continue;
  cells.push({x,y,side:y===6?'north':'south'});
 }return cells;
}

export function woodlandAccentCells(map){
 if(!['waldrand','route2'].includes(map.id))return [];
 const result=[];for(let y=2;y<map.h-2;y++)for(let x=1;x<map.w-1;x++){
  if(map.walls.has(`${x},${y}`)||map.portals.some(p=>p.x===x&&p.y===y)||(terrainKind(map.id,x,y)==='path'||(map.landscapeBushes&&isWalkway(map,x,y))))continue;
  const seed=(x*31+y*47+x*y*7)%29;
  if(seed===0||seed===7)result.push({x,y,kind:seed===0?'leafLitter':'lichen'});
 }return result;
}

export function berryVillageDecorations(map){
 if(map.id!=='beerendorf')return [];
 return [[5,2,'crate'],[10,2,'barrel'],[5,11,'basket'],[10,11,'basket']].filter(([x,y])=>
 !map.walls.has(`${x},${y}`)&&terrainKind(map.id,x,y)!=='path'&&!isWalkway(map,x,y)&&!map.portals.some(p=>p.x===x&&p.y===y));
}

export function landscapeObstacleCells(map){return landscapeDetails(map).filter(d=>d.type==='berryBush').map(({x,y})=>[x,y]);}

// Prüft dekorative Elemente gegen Hindernisse und reservierte Zugänge.
export function auditSafeVillageDecorations(map){
 const issues=[];
 for(const [x,y] of safeVillageDecorations(map)){
  if(map.walls.has(`${x},${y}`))issues.push(`${map.id}: Dekoration auf Hindernis ${x},${y}`);
  if(map.portals.some(p=>p.x===x&&p.y===y))issues.push(`${map.id}: Dekoration auf Portal ${x},${y}`);
 }
 return issues;
}
