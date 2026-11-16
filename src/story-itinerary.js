import {findStoryWalk,storyWalkIsAdjacent} from './story-autowalk.js';
// Ein Storylauf besteht aus regulären Nachbarschritten und expliziten Portalwechseln.
export const RIFT_STOPS=Object.freeze({ground:[5,8],yard:[7,11],village:[11,7]});
export const RIFT_ARRIVALS=Object.freeze({yard:[7,2],village:[10,1]});
export function buildRiftItinerary(mapId,from){
 const order=['ground','yard','village'],start=order.indexOf(mapId);
 if(start<0||!Array.isArray(from)||from.length!==2||!from.every(Number.isInteger))return null;
 const steps=[];let at=from;
 for(let i=start;i<order.length;i++){
  const id=order[i],walk=findStoryWalk(id,at,RIFT_STOPS[id]);
  if(!walk||!storyWalkIsAdjacent(at,walk))return null;
  for(const [x,y] of walk)steps.push({kind:'step',mapId:id,x,y});
  if(i<order.length-1){const next=order[i+1];at=RIFT_ARRIVALS[next];steps.push({kind:'portal',mapId:next,x:at[0],y:at[1]});}
 }
 return steps;
}

// Prüft die gespeicherte Position, bevor eine unterbrochene Szene wieder startet.
export function riftResumeReady(mapId,from){return buildRiftItinerary(mapId,from)!==null;}

export function auditRiftItinerary(){const starts=[['ground',[5,7]],['yard',[7,2]],['village',[10,1]]];return starts.map(([id,at])=>({mapId:id,valid:riftResumeReady(id,at)}));}

export function validateRiftItinerary(steps,startMap,startPosition){
 if(!Array.isArray(steps)||!Array.isArray(startPosition)||startPosition.length!==2||!startPosition.every(Number.isInteger))return false;
 if(!steps.every(s=>s&&typeof s==='object'&&Number.isInteger(s.x)&&Number.isInteger(s.y)))return false;
 let mapId=startMap,[x,y]=startPosition;
 for(const step of steps){
  if(step.kind==='step'){
   if(step.mapId!==mapId||Math.abs(step.x-x)+Math.abs(step.y-y)!==1)return false;
  }else if(step.kind==='portal'){
   const expected=mapId==='ground'?'yard':mapId==='yard'?'village':null;
   if(step.mapId!==expected||!RIFT_ARRIVALS[expected]||step.x!==RIFT_ARRIVALS[expected][0]||step.y!==RIFT_ARRIVALS[expected][1]||x!==RIFT_STOPS[mapId][0]||y!==RIFT_STOPS[mapId][1])return false;
  }else return false;
  mapId=step.mapId;x=step.x;y=step.y;
 }
 return mapId==='village'&&x===11&&y===7;
}
