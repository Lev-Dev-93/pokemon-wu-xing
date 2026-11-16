import {maps,npcs,objects,canMove,inside,buildingCells} from './maps.js';
export const OUTDOOR_IDS=Object.freeze(['yard','village','professor_clearing','route1','brook','waldrand','beerendorf','route2']);
const key=(x,y)=>`${x},${y}`;
const directions=[[0,-1],[1,0],[0,1],[-1,0]];
export function reachableTiles(map,start){
 const result=new Set();if(!map||!inside(map,start.x,start.y)||map.walls.has(key(start.x,start.y)))return result;
 const queue=[[start.x,start.y]];result.add(key(start.x,start.y));
 for(let i=0;i<queue.length;i++){const [x,y]=queue[i];for(const [dx,dy] of directions){const nx=x+dx,ny=y+dy,k=key(nx,ny);if(!result.has(k)&&canMove(map,x,y,nx,ny)){result.add(k);queue.push([nx,ny]);}}}
 return result;
}
export function auditPortalReachability(world=maps,ids=OUTDOOR_IDS){
 const issues=[];for(const id of ids){const map=world[id];if(!map){issues.push(`${id}: Karte fehlt`);continue;}
 if(!map.portals.length)continue;const first=map.portals[0],reached=reachableTiles(map,first);
 for(const portal of map.portals)if(!reached.has(key(portal.x,portal.y)))issues.push(`${id}: Portal ${key(portal.x,portal.y)} nach ${portal.target} nicht erreichbar`);
 }return issues;
}
export function auditPortalArrivals(world=maps,ids=OUTDOOR_IDS){
 const issues=[];for(const id of ids){const map=world[id];if(!map)continue;
 for(const portal of map.portals){const target=world[portal.target];if(!target){issues.push(`${id}: Zielkarte ${portal.target} fehlt`);continue;}
 if(!inside(target,portal.tx,portal.ty)||target.walls.has(key(portal.tx,portal.ty)))issues.push(`${id}: Ankunft in ${portal.target} bei ${key(portal.tx,portal.ty)} blockiert`);
 if(portal.kind==='path'&&!target.portals.some(back=>back.target===id&&back.kind==='path'))issues.push(`${id}: Rückweg von ${portal.target} fehlt`);
 }}return issues;
}
export function auditNpcApproaches(world=maps,actors=npcs,ids=OUTDOOR_IDS){
 const issues=[];for(const id of ids){const map=world[id];if(!map||!map.portals.length)continue;
 const reached=reachableTiles(map,map.portals[0]);for(const npc of actors[id]||[]){
 if(!directions.some(([dx,dy])=>reached.has(key(npc.x+dx,npc.y+dy))))issues.push(`${id}: NPC ${npc.id} nicht ansprechbar`);
 }}return issues;
}
export function auditBuildingFootprints(world=maps,ids=['village','professor_clearing','beerendorf']){
 const issues=[];for(const id of ids){const map=world[id];if(!map)continue;
 const occupied=new Set(buildingCells(id).map(([x,y])=>key(x,y)));
 for(const portal of map.portals){const k=key(portal.x,portal.y);if(occupied.has(k))issues.push(`${id}: Portal ${k} liegt auf Gebäude`);}
 for(const cell of occupied)if(!map.walls.has(cell))issues.push(`${id}: Gebäude bei ${cell} nicht blockiert`);
 }return issues;
}
export function auditWorldTravel(world=maps,ids=OUTDOOR_IDS){
 const issues=[],seen=new Set(),queue=['village'];
 while(queue.length){const id=queue.shift();if(seen.has(id)||!world[id])continue;seen.add(id);
 for(const portal of world[id].portals)if(portal.kind==='path'&&ids.includes(portal.target)&&!seen.has(portal.target))queue.push(portal.target);
 }for(const id of ids)if(!seen.has(id))issues.push(`${id}: von Mu aus nicht erreichbar`);
 return issues;
}
export function auditCompleteWorld(world=maps){return [...auditPortalReachability(world),...auditPortalArrivals(world),...auditNpcApproaches(world),...auditBuildingFootprints(world),...auditWorldTravel(world)];}
