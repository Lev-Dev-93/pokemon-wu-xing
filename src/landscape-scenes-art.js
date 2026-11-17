// dev.731: coherent regional 3x2 landscape scenes, purely visual.
// A scene is drawn only when its entire footprint is safe; no game state changes.
const T=32;
const THEMES={
 village:{kind:'garden',soil:'#795d42',rim:'#b18b5b',leaf:'#4e8550',accent:'#eac5a1'},
 beerendorf:{kind:'berrygarden',soil:'#70563d',rim:'#b18c60',leaf:'#3e794d',accent:'#d36e89'},
 professor_clearing:{kind:'fernpatch',soil:'#5a6b46',rim:'#8ea77b',leaf:'#32765c',accent:'#a9d0a0'},
 yard:{kind:'meadow',soil:'#72834e',rim:'#b3b87b',leaf:'#648d49',accent:'#e8d18c'}
};
const yardPath=(x,y)=>(x===7&&y>=2)||(y===10&&x>=4&&x<=10);
export function landscapeScenePixels(map,isPath){
 if(!map||!THEMES[map.id]||!Number.isInteger(map.w)||!Number.isInteger(map.h)||!(map.walls instanceof Set)||typeof isPath!=='function')return [];
 const theme=THEMES[map.id],portals=new Set((map.portals||[]).map(p=>`${p.x},${p.y}`)),out=[];
 const clear=(x,y)=>x>0&&y>0&&x<map.w-1&&y<map.h-1&&!map.walls.has(`${x},${y}`)&&!portals.has(`${x},${y}`)&&!(map.id==='yard'?yardPath(x,y):isPath(map.id,x,y));
 const put=(cx,cy,dx,dy,w,h,color)=>{if(dx>=0&&dy>=0&&dx+w<=T&&dy+h<=T)out.push({x:cx*T+dx,y:cy*T+dy,w,h,color,cellX:cx,cellY:cy,kind:theme.kind});};
 let placed=0;
 const chosen=[];
 // Sparse large features, aligned to fixed world coordinates for repeatable saves.
 for(let y=2;y+1<map.h-1&&placed<2;y++)for(let x=2;x+2<map.w-1&&placed<2;x++){
  if(chosen.some(([px,py])=>Math.abs(px-x)<6&&Math.abs(py-y)<5))continue;
  if(!Array.from({length:6},(_,i)=>clear(x+i%3,y+Math.floor(i/3))).every(Boolean))continue;
  placed++;chosen.push([x,y]);
  for(let dy=0;dy<2;dy++)for(let dx=0;dx<3;dx++){
   const cx=x+dx,cy=y+dy;
   // Continuous top/bottom rims and endcaps across all six tiles.
   put(cx,cy,2,dy===0?12:4,28,dy===0?18:21,theme.soil);
   put(cx,cy,2,dy===0?12:4,28,2,theme.rim);
   put(cx,cy,2,dy===0?28:23,28,2,theme.rim);
   if(dx===0)put(cx,cy,2,dy===0?12:4,2,dy===0?18:21,theme.rim);
   if(dx===2)put(cx,cy,28,dy===0?12:4,2,dy===0?18:21,theme.rim);
   if(theme.kind==='garden'){
    for(const bx of [8,19]){put(cx,cy,bx,dy===0?17:10,2,8,theme.leaf);put(cx,cy,bx-2,dy===0?15:8,6,5,theme.accent);}
   }else if(theme.kind==='berrygarden'){
    for(const bx of [7,18]){put(cx,cy,bx,dy===0?17:10,9,8,theme.leaf);put(cx,cy,bx+2,dy===0?18:11,3,3,theme.accent);}
   }else if(theme.kind==='fernpatch'){
    for(const bx of [7,17]){put(cx,cy,bx+3,dy===0?15:7,2,13,theme.leaf);put(cx,cy,bx,dy===0?17:9,9,3,theme.accent);put(cx,cy,bx+1,dy===0?23:15,8,3,theme.leaf);}
   }else{
    for(const bx of [7,15,23]){put(cx,cy,bx,dy===0?16:8,2,11,theme.leaf);put(cx,cy,bx-2,dy===0?14:6,6,3,theme.accent);}
   }
  }
 }
 return out;
}
