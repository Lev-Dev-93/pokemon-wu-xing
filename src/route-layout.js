// Kein Dijkstra und keine nachtraeglich erzeugten Wege: das Kartenlayout ist autoritativ.
import {isPlannedRoad,OUTDOOR_IDS} from './path-geometry.js';
const key=(x,y)=>`${x},${y}`;
export function walkwayCells(map){
 const cells=new Set(),unreachable=[];
 if(OUTDOOR_IDS.includes(map.id))for(let y=0;y<map.h;y++)for(let x=0;x<map.w;x++)if(isPlannedRoad(map.id,x,y)&&!map.walls.has(key(x,y)))cells.add(key(x,y));
 for(const p of map.portals)if(OUTDOOR_IDS.includes(map.id)&&!cells.has(key(p.x,p.y)))unreachable.push(key(p.x,p.y));
 return {cells,unreachable};
}
export function isWalkway(map,x,y){return isPlannedRoad(map.id,x,y)&&!map.walls.has(key(x,y));}
export function auditWalkwayNetwork(maps){const issues=[];for(const id of OUTDOOR_IDS){const map=maps[id];if(!map)continue;const {cells,unreachable}=walkwayCells(map);for(const k of unreachable)issues.push(`${id}: Portal ${k} ohne geplanten Weg`);for(const k of cells)if(map.walls.has(k))issues.push(`${id}: Weg blockiert ${k}`);}return issues;}
