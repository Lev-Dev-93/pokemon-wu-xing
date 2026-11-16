// Deterministic, purely visual biome details. No collision or encounter changes.
export const landscapeBiomes = Object.freeze({route1:'meadow',brook:'riverside',waldrand:'edge',beerendorf:'hamlet',route2:'ancientForest'});
export function terrainKind(mapId,x,y){
 if(mapId==='brook'&&y>=7&&y<=9)return x>=6&&x<=9?'bridge':'water';
 if(mapId==='beerendorf'&&((x>=6&&x<=9)||(y===7&&x>=4&&x<=13)))return 'path';
 if(['route1','brook','waldrand','route2'].includes(mapId)&&x>=6&&x<=9)return 'path';
 return 'grass';
}
export function landscapeDetails(map){
 const biome=landscapeBiomes[map.id];if(!biome)return [];
 const protectedCells=new Set([...map.portals.map(q=>`${q.x},${q.y}`)]);
 const result=[];
 for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  if(map.walls.has(`${x},${y}`)||protectedCells.has(`${x},${y}`)||terrainKind(map.id,x,y)!=='grass')continue;
  const seed=(x*73+y*137+x*y*19+map.id.length*43)%101;
  let type=null;
  if(biome==='meadow')type=seed<13?'wildflower':seed<24?'tuft':seed===40?'stone':null;
  if(biome==='riverside')type=seed<11?'reeds':seed<19?'pebbles':seed<25?'wildflower':null;
  if(biome==='edge')type=seed<20?'fern':seed<30?'tuft':seed<34?'mushroom':null;
  if(biome==='hamlet')type=seed<12?'berryBush':seed<20?'wildflower':seed<23?'stone':null;
  if(biome==='ancientForest')type=seed<24?'fern':seed<37?'mushroom':seed<44?'roots':null;
  if(type)result.push({x,y,type});
 }
 return result;
}
