// Original 32px pixel-art ground accents. Decorative only: no map or collision mutations.
const OUTDOOR=new Set(['yard','beerendorf','village']);
const TILE=32;
export function outdoorGroundAccents(map, isPath){
 if(!map||!OUTDOOR.has(map.id)||!Number.isInteger(map.w)||!Number.isInteger(map.h))return [];
 const parts=[];
 const portals=new Set((map.portals||[]).map(p=>`${p.x},${p.y}`));
 for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  const key=`${x},${y}`;
  if(map.walls?.has(key)||portals.has(key)||isPath(map.id,x,y))continue;
  const seed=(x*37+y*53+map.id.length*19)%23;
  if(seed>8)continue;
  const X=x*TILE,Y=y*TILE;
  const put=(dx,dy,w,h,color)=>parts.push({x:X+dx,y:Y+dy,w,h,color,tileX:x,tileY:y});
  if(seed===0||seed===5){ // tiny flowering clump, anchored to the ground
   put(11,23,2,5,'#447d4c');put(17,22,2,6,'#538c52');
   put(9,20,5,4,map.id==='beerendorf'?'#dfb6d1':'#e6d7a0');
   put(16,18,5,4,'#f2e4ba');put(11,21,2,2,'#f8e9c7');
  }else if(seed===2||seed===7){ // short, irregular grass silhouettes
   put(7,24,2,5,'#4b8b53');put(11,21,2,8,'#609a59');
   put(16,25,2,4,'#3e7e4b');put(20,23,2,6,'#78ab65');
  }else if(seed===4){ // small pale stones, no collision
   put(10,25,9,3,'#a7aa86');put(12,23,5,2,'#d2cfaa');
  }else if(seed===8){ // leaf litter
   put(8,23,5,2,'#b5a56b');put(19,26,4,2,'#d2bc79');
  }
 }
 return parts;
}
