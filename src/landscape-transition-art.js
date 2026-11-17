// Deterministic, render-only vegetation at the transition between footpaths and grass.
// Every pixel stays inside its source grass tile; paths, portals and collisions remain untouched.
const TILE=32;
const PALETTES={
 village:{dark:'#467b48',light:'#a6c77d',flower:'#e8d6a1'},
 beerendorf:{dark:'#44764d',light:'#a2c277',flower:'#e9a8c1'},
 professor_clearing:{dark:'#3f7953',light:'#a3c58c',flower:'#d6d1a2'},
 yard:{dark:'#527b44',light:'#b1c780',flower:'#e8d6a4'}
};
const yardPath=(x,y)=>(x===7&&y>=2)||(y===10&&x>=4&&x<=10);
export function landscapeTransitionPixels(map,isPath){
 if(!map||!PALETTES[map.id]||!Number.isInteger(map.w)||!Number.isInteger(map.h)||!map.walls||typeof isPath!=='function')return [];
 const theme=PALETTES[map.id],parts=[];
 const portals=new Set((map.portals||[]).map(p=>`${p.x},${p.y}`));
 const inside=(x,y)=>x>=0&&y>=0&&x<map.w&&y<map.h;
 const path=(x,y)=>inside(x,y)&&!map.walls.has(`${x},${y}`)&&(map.id==='yard'?yardPath(x,y):isPath(map.id,x,y));
 const grass=(x,y)=>inside(x,y)&&!map.walls.has(`${x},${y}`)&&!portals.has(`${x},${y}`)&&!path(x,y);
 const add=(x,y,dx,dy,w,h,color)=>parts.push({x:x*TILE+dx,y:y*TILE+dy,w,h,color,cellX:x,cellY:y});
 for(let y=0;y<map.h;y++)for(let x=0;x<map.w;x++){
  if(!grass(x,y))continue;
  const sides=[path(x,y-1),path(x+1,y),path(x,y+1),path(x-1,y)];
  if(!sides.some(Boolean))continue;
  // Short blades on the grass side of the path boundary, not a continuous solid border.
  for(let side=0;side<4;side++)if(sides[side]){
   for(let i=0;i<3;i++){
    const seed=(x*19+y*31+side*13+i*7+map.id.length)%11;
    const offset=5+i*9+(seed%3);
    const depth=3+(seed%4);
    if(side===0)add(x,y,offset,2,2,depth,theme.dark);
    if(side===2)add(x,y,offset,30-depth,2,depth,theme.dark);
    if(side===1)add(x,y,30-depth,offset,depth,2,theme.dark);
    if(side===3)add(x,y,2,offset,depth,2,theme.dark);
   }
  }
  // Small flower and leaf clusters at occasional corners: visually distinct per settlement.
  const seed=(x*23+y*17+map.id.length*5)%13;
  if(sides.filter(Boolean).length>=2&&seed%3===0){
   add(x,y,13,15,3,5,theme.dark);add(x,y,17,17,2,4,theme.light);
   add(x,y,12,13,5,4,theme.flower);
  }else if(seed===1){add(x,y,13,14,3,4,theme.light);add(x,y,18,19,4,2,theme.dark)}
 }
 return parts;
}
