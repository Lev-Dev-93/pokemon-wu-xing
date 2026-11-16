import {maps,npcs,inside} from './maps.js';
// Deterministischer kürzester Fußweg ohne Hindernisse und NPC-Kollisionen.
export function findStoryWalk(mapId,from,to){
 const map=maps[mapId];if(!map||!inside(map,...from)||!inside(map,...to))return null;
 const blocked=new Set([...map.walls,...(npcs[mapId]||[]).map(n=>`${n.x},${n.y}`)]);
 const key=([x,y])=>`${x},${y}`;if(blocked.has(key(to)))return null;
 const queue=[from],seen=new Set([key(from)]),previous=new Map();
 for(let i=0;i<queue.length;i++){
  const at=queue[i];if(key(at)===key(to)){
   const result=[];let cursor=key(at);while(cursor!==key(from)){const [x,y]=cursor.split(',').map(Number);result.unshift([x,y]);cursor=previous.get(cursor)}return result;
  }
  for(const [dx,dy] of [[0,1],[1,0],[-1,0],[0,-1]]){
   const next=[at[0]+dx,at[1]+dy],k=key(next);
   if(inside(map,...next)&&!blocked.has(k)&&!seen.has(k)){seen.add(k);previous.set(k,key(at));queue.push(next)}
  }
 }
 return null;
}
export const STORY_WALK_TARGETS=Object.freeze({rival:[14,8],villageExit:[10,0],yardExit:[7,1],parents:[6,3]});
