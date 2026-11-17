import {maps,npcs,objects,inside,tileHeight} from './maps.js';
// Runtime data is untrusted. Only positions and facing of known NPCs may be restored.
const DIRECTIONS=new Set(['up','down','left','right']);
export function restoreNpcRuntime(runtime,player){
 const empty={turn:0,positions:{}};
 if(runtime==null)return empty; // Older save schemas had no NPC runtime.
 if(!runtime||typeof runtime!=='object'||Array.isArray(runtime)||!Number.isSafeInteger(runtime.turn)||runtime.turn<0||runtime.turn>1_000_000_000||!runtime.positions||typeof runtime.positions!=='object'||Array.isArray(runtime.positions))throw Error('Ungültige NPC-Speicherdaten');
 const positions={};
 for(const [mapId,actors] of Object.entries(runtime.positions)){
  const map=maps[mapId],original=npcs[mapId]||[];
  if(!map||!Array.isArray(actors)||actors.length!==original.length)throw Error('Ungültige NPC-Karte');
  const seen=new Set();
  positions[mapId]=actors.map((actor,i)=>{
   const base=original[i];
   if(!actor||actor.id!==base.id||!Number.isInteger(actor.x)||!Number.isInteger(actor.y)||!inside(map,actor.x,actor.y)||map.walls.has(`${actor.x},${actor.y}`)||tileHeight(map,actor.x,actor.y)!==tileHeight(map,base.x,base.y)||!(actor.facing===undefined||DIRECTIONS.has(actor.facing))||seen.has(`${actor.x},${actor.y}`)||(map.portals||[]).some(p=>p.x===actor.x&&p.y===actor.y)||(objects[mapId]||[]).some(o=>o.x===actor.x&&o.y===actor.y)||(player.mapId===mapId&&player.x===actor.x&&player.y===actor.y))throw Error('Ungültige NPC-Position');
   seen.add(`${actor.x},${actor.y}`);
   return {...base,x:actor.x,y:actor.y,facing:actor.facing??base.facing};
  });
 }
 return {turn:runtime.turn,positions};
}
