import {maps,npcs,objects,inside} from './maps.js';
import {HELD_BATTLE_ITEMS} from './held-battle-items.js';

// Deliberately empty: content authors can add placements later without editing the engine.
export const WORLD_PICKUPS=Object.freeze([]);
export function validCollectedPickups(value){return Array.isArray(value)&&value.length<=10000&&value.every(id=>typeof id==='string'&&/^[a-z0-9][a-z0-9_-]{0,79}$/.test(id))&&new Set(value).size===value.length;}
export function validatePickupPlacement(p,registry=WORLD_PICKUPS){
 if(!p||typeof p.id!=='string'||!/^[a-z0-9][a-z0-9_-]{0,79}$/.test(p.id)||!Object.hasOwn(HELD_BATTLE_ITEMS,p.itemId)||!Number.isSafeInteger(p.quantity)||p.quantity<1||p.quantity>99)return false;
 const map=maps[p.mapId];if(!map||!Number.isInteger(p.x)||!Number.isInteger(p.y)||!inside(map,p.x,p.y)||map.walls.has(`${p.x},${p.y}`)||map.portals.some(q=>q.x===p.x&&q.y===p.y)||map.landscapeArrivalCells?.has(`${p.x},${p.y}`))return false;
 if((npcs[p.mapId]||[]).some(n=>n.x===p.x&&n.y===p.y)||(objects[p.mapId]||[]).some(o=>o.x===p.x&&o.y===p.y))return false;
 return !registry.some(other=>other!==p&&(other.id===p.id||(other.mapId===p.mapId&&other.x===p.x&&other.y===p.y)));
}
export function pickupAt(mapId,x,y,collected=[],registry=WORLD_PICKUPS){return registry.find(p=>p.mapId===mapId&&p.x===x&&p.y===y&&!collected.includes(p.id))||null;}
export function availablePickups(mapId,collected=[],registry=WORLD_PICKUPS){return registry.filter(p=>p.mapId===mapId&&!collected.includes(p.id));}
