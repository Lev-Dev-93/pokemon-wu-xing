import {validateNpcSchedule,npcMovementPhase} from './npc-patrol.js';
import {auditInteractionTargets} from './interaction-targets.js';
import {maps,npcs,objects,inside,tileHeight,canMove} from './maps.js';
export function auditWorld(){
 const errors=[];
 for(const [id,map] of Object.entries(maps)){
  if(id!==map.id)errors.push(`${id}: Karten-ID stimmt nicht`);
  if(!Array.isArray(map.portals)){errors.push(`${id}: Portalliste fehlt`);continue;}
  for(const portal of map.portals){
   if(!portal||!Number.isInteger(portal.x)||!Number.isInteger(portal.y)||!Number.isInteger(portal.tx)||!Number.isInteger(portal.ty)||typeof portal.target!=='string'||!portal.target.trim()){
    errors.push(`${id}: ungültige Portaldaten`);continue;
   }

   const dest=maps[portal.target];
   if(!inside(map,portal.x,portal.y)||map.walls.has(`${portal.x},${portal.y}`))errors.push(`${id}: Portal nicht betretbar`);
   if(!dest){errors.push(`${id}: Zielkarte ${portal.target} fehlt`);continue;}
   if(!inside(dest,portal.tx,portal.ty)||dest.walls.has(`${portal.tx},${portal.ty}`)||(npcs[dest.id]||[]).some(n=>n.x===portal.tx&&n.y===portal.ty))errors.push(`${id}: Zielposition blockiert`);
   if(!Array.isArray(dest.portals)||!dest.portals.some(back=>back.target===id))errors.push(`${id}: kein Rückweg aus ${dest.id}`);
  }
  for(const issue of auditInteractionTargets(map,npcs[id]||[],objects[id]||[]))errors.push(`${id}: ${issue}`);
  const npcIds=new Set();
  for(const npc of npcs[id]||[]){if(npcIds.has(npc.id))errors.push(`${id}: doppelte NPC-ID ${npc.id}`);npcIds.add(npc.id);}
  for(const npc of npcs[id]||[]){
   if((npc.patrol!==undefined||npc.schedule!==undefined)&&npcMovementPhase(npc,0)===null)errors.push(`${id}: ungültige NPC-Bewegungsparameter ${npc.id}`);
   if(npc.schedule!==undefined&&!validateNpcSchedule(npc))errors.push(`${id}: ungültiger NPC-Tagesablauf ${npc.id}`);
   if(npc.patrol!==undefined&&(!Array.isArray(npc.patrol)||!npc.patrol.length||npc.patrol.some(direction=>!['up','down','left','right'].includes(direction))))errors.push(`${id}: ungültige NPC-Patrouille ${npc.id}`);
  }
  for(const npc of npcs[id]||[])if(!inside(map,npc.x,npc.y)||map.walls.has(`${npc.x},${npc.y}`))errors.push(`${id}: NPC ${npc.id} außerhalb oder in Wand`);
  for(const object of objects[id]||[])if(!inside(map,object.x,object.y))errors.push(`${id}: Objekt ${object.id} außerhalb`);
 }
 return errors;
}
export function reachableMaps(origin='bedroom'){
 if(typeof origin!=='string'||!Object.hasOwn(maps,origin))return new Set();

 const seen=new Set([origin]),queue=[origin];
 for(let i=0;i<queue.length;i++)for(const portal of maps[queue[i]]?.portals||[]){
  if(!portal||typeof portal.target!=='string'||!Object.hasOwn(maps,portal.target)||seen.has(portal.target))continue;
  seen.add(portal.target);queue.push(portal.target);
 }
 return seen;
}

export function auditWalkablePortals(){
 const errors=[];
 for(const map of Object.values(maps))for(const portal of map.portals){
  const approaches=[[0,-1],[0,1],[-1,0],[1,0]].some(([dx,dy])=>canMove(map,portal.x+dx,portal.y+dy,portal.x,portal.y));
  if(!approaches)errors.push(`${map.id}: Portal ${portal.target} von keinem Nachbarfeld erreichbar`);
  const dest=maps[portal.target];if(!dest)continue;
  const escapes=[[0,-1],[0,1],[-1,0],[1,0]].some(([dx,dy])=>canMove(dest,portal.tx,portal.ty,portal.tx+dx,portal.ty+dy)&&!(npcs[dest.id]||[]).some(n=>n.x===portal.tx+dx&&n.y===portal.ty+dy));
  if(!escapes)errors.push(`${map.id}: Spawn in ${dest.id} ohne freien Ausweg`);
 }
 return errors;
}
