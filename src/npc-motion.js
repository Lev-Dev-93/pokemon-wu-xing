import {startWalk,walkVisual} from './character-motion.js';
// A render-only snapshot: NPC collision and interaction always use logical coordinates.
export function captureNpcMotions(before,after,mapId,now){
 const previous=new Map((before||[]).filter(a=>a?.id).map(a=>[a.id,a]));
 const motions=new Map();
 for(const actor of after||[]){
  if(!actor?.id||!previous.has(actor.id))continue;
  const old=previous.get(actor.id);
  const motion=startWalk({...old,mapId},{...actor,mapId},now);
  if(motion)motions.set(actor.id,motion);
 }
 return motions;
}
export function npcVisualActors(actors,motions,mapId,now,reduced=false){
 return (actors||[]).map(actor=>{
  const visual=actor?.id?walkVisual(motions?.get(actor.id),now,mapId,reduced):null;
  return visual?{...actor,x:visual.x,y:visual.y,moving:true,walkPhase:visual.phase}:{...actor,moving:false};
 });
}
export function npcMotionsActive(motions,now,mapId,reduced=false){
 if(reduced||!motions)return false;
 for(const motion of motions.values())if(walkVisual(motion,now,mapId,false))return true;
 return false;
}
